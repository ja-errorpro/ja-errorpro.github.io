/*
 * Glitch-on-hover for hyperlinks
 * Ported from React Bits GlitchText (github.com/DavidHDev/react-bits, MIT), using its
 * "enable-on-hover" behaviour: the RGB-split glitch only plays while the pointer is
 * over the link. The visual itself is 100% CSS (see cyberpunk.css, .glitch-link);
 * this script just tags eligible <a> elements and copies their text into data-text,
 * which the CSS pseudo-elements duplicate for the glitch layers.
 */
(function () {
  'use strict';

  function tagLinks() {
    var links = document.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];

      // Skip links that already have their own glitch treatment or are structural:
      // headings, article titles and the site logo.
      if (a.closest('h1, h2, h3, h4, h5, h6, .article-title, #logo, #header h1')) continue;

      // Skip links wrapping icons/images/other elements — only glitch plain-text links.
      if (a.querySelector('*')) continue;

      var text = (a.textContent || '').trim();
      if (!text) continue;          // nothing to glitch
      if (text.length > 60) continue; // avoid glitching very long links (looks messy)

      a.setAttribute('data-text', text);
      a.classList.add('glitch-link');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tagLinks);
  } else {
    tagLinks();
  }
})();
