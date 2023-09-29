const WIDTH = 800;
const HEIGHT = 600;
const DEFAULT_RADIUS = 15;


let engine = new Engine(WIDTH, HEIGHT);
let energyDisplay = document.createElement('div');
energyDisplay.setAttribute('class', 'energyDisplay')
document.body.appendChild(energyDisplay);

function setup() {
    noStroke();
    let c = createCanvas(WIDTH, HEIGHT);
    c.mousePressed(function() {
        engine.createCircle(DEFAULT_RADIUS, mouseX, mouseY)
    });
    engine.createCircle(50,WIDTH/2, HEIGHT/2, {fixed: true, color: "#808080"});
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
    calculateEnergy();
    lastUpdate = Date.now();
}

function calculateEnergy(){
    let energy = 0;
    for(let body of engine.bodies){
        if(body.fixed) continue;
        energy += .5*body.mass*body.velocity.length()**2;
        energy += body.mass*981*(HEIGHT - body.position.y);
    }
    energyDisplay.textContent = parseInt(energy);
}