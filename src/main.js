import Vector from './utils.js'

var Engine = function() {
    return {
        "bodies" : [],
        "createCircle" : function(radius, x, y, options) {
            let newCircle = {
                "radius" : radius,
                "position" : new Vector(x, y),
                "previousPosition" : new Vector(x, y),
                "acceleration" : new Vector(0, 0),
                "color" : "#FF0000",
                ...options
            };
            this.bodies.push(newCircle);
            return newCircle;
        },
    };
};

const WIDTH = 800;
const HEIGHT = 600;
const DEFAULT_RADIUS = 15;


let engine = new Engine();

function setup() {
    noStroke();
    let c = createCanvas(WIDTH, HEIGHT);
    c.mousePressed(function() {
        engine.createCircle(DEFAULT_RADIUS, mouseX, mouseY)
    });
}


function draw(){
    background(255);

    for (let body of engine.bodies){
        fill(body.color);
        ellipse(body.position.x, body.position.y, body.radius*2, body.radius*2)
    }
}