const WIDTH = 800;
const HEIGHT = 600;
const DEFAULT_RADIUS = 15;


let engine = new Engine(WIDTH, HEIGHT);

function setup() {
    noStroke();
    let c = createCanvas(WIDTH, HEIGHT);
    c.mousePressed(function() {
        engine.createCircle(DEFAULT_RADIUS, mouseX, mouseY)
    });
}

var lastUpdate = Date.now();

function draw(){
    background(255);
    
    for (let body of engine.bodies){
        fill(body.color);
        ellipse(body.position.x, body.position.y, body.radius*2, body.radius*2)
    }

    delta = (Date.now() - lastUpdate)/1000;
    engine.step(delta);
    lastUpdate = Date.now();
}