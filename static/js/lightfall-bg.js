/*
 * Lightfall animated background
 * Ported from React Bits (github.com/DavidHDev/react-bits, MIT) to framework-free
 * vanilla JS for this Hugo site. Renders a full-screen WebGL (OGL) shader background
 * of colourful light streaks raining down a glowing tunnel, with a cursor light.
 *
 * Replaces the previous Vanta.NET background. To revert, restore the vanta block in
 * layouts/partials/footerInclude.html and remove this script include.
 *
 * Perf notes vs. Vanta.NET (geometry, very light): this is a per-pixel fragment
 * shader, so it is heavier on the GPU. Kept comparable with: capped devicePixelRatio
 * and pausing render while the tab is hidden.
 */
(function () {
  'use strict';

  // Note: this background intentionally runs regardless of prefers-reduced-motion
  // (per site owner's choice). The tab-hidden pause and DPR cap below still apply.

  // ---- Tunables ------------------------------------------------------------
  var MAX_DPR = 1.25;            // cap devicePixelRatio (background use → soft is fine)
  var OGL_URL = 'https://cdn.jsdelivr.net/npm/ogl@1/+esm';
  var PROPS = {
    colors: ['#00F0FF', '#5227FF', '#FF003C'], // cyan / violet / neon-red (cyberpunk)
    backgroundColor: '#0A29FF',
    speed: 0.5,
    streakCount: 3,
    streakWidth: 1,
    streakLength: 1,
    glow: 1,
    density: 0.6,
    twinkle: 1,
    zoom: 3,
    backgroundGlow: 0.5,
    opacity: 1,
    mouseInteraction: true,
    mouseStrength: 0.5,
    mouseRadius: 1,
    mouseDampening: 0.15
  };

  // ---- Colour helpers (verbatim from React Bits) ---------------------------
  var MAX_COLORS = 8;

  function hexToRGB(hex) {
    var c = hex.replace('#', '').padEnd(6, '0');
    var r = parseInt(c.slice(0, 2), 16) / 255;
    var g = parseInt(c.slice(2, 4), 16) / 255;
    var b = parseInt(c.slice(4, 6), 16) / 255;
    return [r, g, b];
  }

  function prepColors(input) {
    var base = (input && input.length ? input : ['#A6C8FF', '#5227FF', '#FF9FFC']).slice(0, MAX_COLORS);
    var count = base.length;
    var arr = [];
    for (var i = 0; i < MAX_COLORS; i++) arr.push(hexToRGB(base[Math.min(i, base.length - 1)]));
    var avg = [0, 0, 0];
    for (var j = 0; j < count; j++) {
      avg[0] += arr[j][0];
      avg[1] += arr[j][1];
      avg[2] += arr[j][2];
    }
    avg[0] /= count;
    avg[1] /= count;
    avg[2] /= count;
    return { arr: arr, count: count, avg: avg };
  }

  // ---- Shaders (verbatim from React Bits Lightfall) ------------------------
  var vertex = [
    'attribute vec2 position;',
    'attribute vec2 uv;',
    'varying vec2 vUv;',
    'void main() {',
    '  vUv = uv;',
    '  gl_Position = vec4(position, 0.0, 1.0);',
    '}'
  ].join('\n');

  var fragment = [
    'precision highp float;',
    '',
    'uniform vec3  iResolution;',
    'uniform vec2  iMouse;',
    'uniform float iTime;',
    '',
    'uniform vec3  uColor0;',
    'uniform vec3  uColor1;',
    'uniform vec3  uColor2;',
    'uniform vec3  uColor3;',
    'uniform vec3  uColor4;',
    'uniform vec3  uColor5;',
    'uniform vec3  uColor6;',
    'uniform vec3  uColor7;',
    'uniform int   uColorCount;',
    '',
    'uniform vec3  uBgColor;',
    'uniform vec3  uMouseColor;',
    'uniform float uSpeed;',
    'uniform int   uStreakCount;',
    'uniform float uStreakWidth;',
    'uniform float uStreakLength;',
    'uniform float uGlow;',
    'uniform float uDensity;',
    'uniform float uTwinkle;',
    'uniform float uZoom;',
    'uniform float uBgGlow;',
    'uniform float uOpacity;',
    'uniform float uMouseEnabled;',
    'uniform float uMouseStrength;',
    'uniform float uMouseRadius;',
    '',
    'varying vec2 vUv;',
    '',
    'vec3 palette(float h) {',
    '  int count = uColorCount;',
    '  if (count < 1) count = 1;',
    '  int idx = int(floor(clamp(h, 0.0, 0.999999) * float(count)));',
    '  if (idx <= 0) return uColor0;',
    '  if (idx == 1) return uColor1;',
    '  if (idx == 2) return uColor2;',
    '  if (idx == 3) return uColor3;',
    '  if (idx == 4) return uColor4;',
    '  if (idx == 5) return uColor5;',
    '  if (idx == 6) return uColor6;',
    '  return uColor7;',
    '}',
    '',
    'vec3 tanhv(vec3 x) {',
    '  vec3 e = exp(-2.0 * x);',
    '  return (1.0 - e) / (1.0 + e);',
    '}',
    '',
    'vec2 sceneC(vec2 frag, vec2 r) {',
    '  vec2 P = (frag + frag - r) / r.x;',
    '  float z = 0.0;',
    '  float d = 1e3;',
    '  vec4 O = vec4(0.0);',
    '  for (int k = 0; k < 39; k++) {',
    '    if (d <= 1e-4) break;',
    '    O = z * normalize(vec4(P, uZoom, 0.0)) - vec4(0.0, 4.0, 1.0, 0.0) / 4.5;',
    '    d = 1.0 - sqrt(length(O * O));',
    '    z += d;',
    '  }',
    '  return vec2(O.x, atan(O.z, O.y));',
    '}',
    '',
    'void mainImage(out vec4 o, vec2 C) {',
    '  vec2 r = iResolution.xy;',
    '  vec2 uv0 = (C + C - r) / r.x;',
    '  float T = 0.1 * iTime * uSpeed + 9.0;',
    '  float angRings = max(1.0, floor(6.28318530718 * max(uDensity, 0.05) + 0.5));',
    '  vec2 Y = vec2(5e-3, 6.28318530718 / angRings);',
    '',
    '  vec2 c0 = sceneC(C, r);',
    '  vec2 cdx = sceneC(C + vec2(1.0, 0.0), r);',
    '  vec2 cdy = sceneC(C + vec2(0.0, 1.0), r);',
    '  vec2 dCx = cdx - c0;',
    '  vec2 dCy = cdy - c0;',
    '  dCx.y -= 6.28318530718 * floor(dCx.y / 6.28318530718 + 0.5);',
    '  dCy.y -= 6.28318530718 * floor(dCy.y / 6.28318530718 + 0.5);',
    '  vec2 fw = abs(dCx) + abs(dCy);',
    '  C = c0;',
    '',
    '  vec2 P = vec2(2.0, 1.0) * uv0 - (r / r.x) * vec2(0.0, 1.0);',
    '  vec4 O = vec4(uBgColor * 90.0 * uBgGlow / (1e3 * dot(P, P) + 6.0), 0.0);',
    '',
    '  float mGlow = 0.0;',
    '  if (uMouseEnabled > 0.5) {',
    '    vec2 mN = (iMouse + iMouse - r) / r.x;',
    '    float md = length(uv0 - mN);',
    '    mGlow = exp(-md * md / max(uMouseRadius * uMouseRadius, 1e-4)) * uMouseStrength;',
    '    O.rgb += uMouseColor * mGlow * 0.25;',
    '  }',
    '',
    '  float zr = 5e-4 * uStreakWidth;',
    '  vec2 rr = vec2(max(length(fw), 1e-5));',
    '  float tail = 19.0 / max(uStreakLength, 0.05);',
    '',
    '  for (int m = 0; m < 16; m++) {',
    '    if (m >= uStreakCount) break;',
    '    float jf = float(m) + 1.0;',
    '    float ic = fract(sin(dot(vec2(jf, floor(C.x / Y.x + 0.5)), vec2(7.0, 11.0)) * 73.0));',
    '    vec2 Pp = C - (T + T * ic) * vec2(0.0, 1.0);',
    '    Pp -= floor(Pp / Y + 0.5) * Y;',
    '    float h = fract(8663.0 * ic);',
    '    vec3 col = palette(h);',
    '    float weight = mix(1.5, 1.0 + sin(T + 7.0 * h + 4.0), uTwinkle);',
    '    weight *= (1.0 + mGlow * 2.0);',
    '    vec2 inner = vec2(length(max(Pp, vec2(-1.0, 0.0))), length(Pp) - zr) - zr;',
    '    vec2 sm = vec2(1.0) - smoothstep(-rr, rr, inner);',
    '    O.rgb += dot(sm, vec2(exp(tail * Pp.y), 3.0)) * col * weight;',
    '    C.x += Y.x / 8.0;',
    '  }',
    '',
    '  vec3 colr = sqrt(tanhv(max(O.rgb * uGlow - vec3(0.04, 0.08, 0.02), 0.0)));',
    '  o = vec4(colr, uOpacity);',
    '}',
    '',
    'void main() {',
    '  vec4 color;',
    '  mainImage(color, vUv * iResolution.xy);',
    '  gl_FragColor = color;',
    '}'
  ].join('\n');

  // ---- Bootstrap -----------------------------------------------------------
  function start() {
    var container = document.createElement('div');
    container.id = 'lightfall-bg';
    document.body.prepend(container);

    // OGL is loaded on demand as an ES module; if it fails we quietly fall back
    // to the plain dark background so the page is never broken.
    import(OGL_URL)
      .then(function (ogl) { init(container, ogl); })
      .catch(function (e) {
        if (container.parentNode) container.parentNode.removeChild(container);
        console.warn('[lightfall] disabled (OGL failed to load):', e);
      });
  }

  function init(container, ogl) {
    var Renderer = ogl.Renderer, Program = ogl.Program, Mesh = ogl.Mesh, Triangle = ogl.Triangle;

    var renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio || 1, MAX_DPR),
      alpha: true,
      antialias: false // full-screen shader has no geometry edges → save GPU
    });
    var gl = renderer.gl;
    var canvas = gl.canvas;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    var prepped = prepColors(PROPS.colors);

    var uniforms = {
      iResolution: { value: [gl.drawingBufferWidth, gl.drawingBufferHeight, 1] },
      iMouse: { value: [0, 0] },
      iTime: { value: 0 },
      uColor0: { value: prepped.arr[0] },
      uColor1: { value: prepped.arr[1] },
      uColor2: { value: prepped.arr[2] },
      uColor3: { value: prepped.arr[3] },
      uColor4: { value: prepped.arr[4] },
      uColor5: { value: prepped.arr[5] },
      uColor6: { value: prepped.arr[6] },
      uColor7: { value: prepped.arr[7] },
      uColorCount: { value: prepped.count },
      uBgColor: { value: hexToRGB(PROPS.backgroundColor) },
      uMouseColor: { value: prepped.avg },
      uSpeed: { value: PROPS.speed },
      uStreakCount: { value: Math.max(1, Math.min(16, Math.round(PROPS.streakCount))) },
      uStreakWidth: { value: PROPS.streakWidth },
      uStreakLength: { value: PROPS.streakLength },
      uGlow: { value: PROPS.glow },
      uDensity: { value: PROPS.density },
      uTwinkle: { value: PROPS.twinkle },
      uZoom: { value: PROPS.zoom },
      uBgGlow: { value: PROPS.backgroundGlow },
      uOpacity: { value: PROPS.opacity },
      uMouseEnabled: { value: PROPS.mouseInteraction ? 1 : 0 },
      uMouseStrength: { value: PROPS.mouseStrength },
      uMouseRadius: { value: PROPS.mouseRadius }
    };

    var program = new Program(gl, { vertex: vertex, fragment: fragment, uniforms: uniforms });
    var geometry = new Triangle(gl);
    var mesh = new Mesh(gl, { geometry: geometry, program: program });

    function resize() {
      var rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1];
    }
    resize();
    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(resize).observe(container);
    }
    window.addEventListener('resize', resize);

    // Pointer is tracked on window (container is pointer-events:none so clicks pass
    // through to the page); coordinates are mapped into the canvas' buffer space.
    var mouseTarget = [0, 0];
    var lastTime = 0;
    if (PROPS.mouseInteraction) {
      window.addEventListener('pointermove', function (e) {
        var rect = canvas.getBoundingClientRect();
        var scale = renderer.dpr || 1;
        var x = (e.clientX - rect.left) * scale;
        var y = (rect.height - (e.clientY - rect.top)) * scale;
        mouseTarget = [x, y];
        if (PROPS.mouseDampening <= 0) uniforms.iMouse.value = [x, y];
      }, { passive: true });
    }

    var hidden = false;
    document.addEventListener('visibilitychange', function () { hidden = document.hidden; });

    function loop(t) {
      requestAnimationFrame(loop);
      if (hidden) return; // don't burn GPU while the tab is in the background
      uniforms.iTime.value = t * 0.001;
      if (PROPS.mouseDampening > 0) {
        if (!lastTime) lastTime = t;
        var dt = (t - lastTime) / 1000;
        lastTime = t;
        var tau = Math.max(1e-4, PROPS.mouseDampening);
        var factor = 1 - Math.exp(-dt / tau);
        if (factor > 1) factor = 1;
        var cur = uniforms.iMouse.value;
        cur[0] += (mouseTarget[0] - cur[0]) * factor;
        cur[1] += (mouseTarget[1] - cur[1]) * factor;
      } else {
        lastTime = t;
      }
      try { renderer.render({ scene: mesh }); } catch (e) { /* ignore transient GL errors */ }
    }
    requestAnimationFrame(loop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
