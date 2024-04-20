
// Add gravity to all web elements,
// so that they fall down to the bottom of the page, animatedly.

// init matter js
var Engine = Matter.Engine,
Render = Matter.Render,
World = Matter.World,
Bodies = Matter.Bodies,
Runner = Matter.Runner,
Composite = Matter.Composite;

var engine = Engine.create();

var render = Render.create({
element: document.getElementsByClassName("content")[0],
engine: engine
});

var runner = Runner.create();

// transform all elements to bodies
var bodies = [];
var elements = document.getElementsByClassName("c001");
for (var i = 0; i < elements.length; i++) {
var el = elements[i];
var rect = el.getBoundingClientRect();
var body = Bodies.rectangle(rect.left + rect.width / 2, rect.top + rect.height / 2, rect.width, rect.height, {
    render: {
        sprite: {
            texture: el.src
        }
    }
});
bodies.push(body);
}

Composite.add(engine.world, bodies);

Composite.add(engine.world, [
Bodies.rectangle(400, 610, 810, 60, { isStatic: true })
]);

Render.run(render);


function whatIsThis() {
 
    engine.world.gravity.y = 1;
    Runner.run(runner, engine);
}