class Engine{
    bodies;
    GRAVITY = 981;

    constructor(width, height){
        this.height = height;
        this.width = width;
        this.bodies = []
    }

    createCircle(radius, x, y, options){
        let newCircle = {
            "radius" : radius,
            "position" : new Vector(x, y),
            "previousPosition" : new Vector(x, y),
            "acceleration" : new Vector(0, 0),
            "restitution" : 1,
            "update" : bodyUpdate,
            "color" : "#FF0000",
            ...options
        };
        this.bodies.push(newCircle);
        return newCircle;
    }

    step(dt){
        for (let body of this.bodies){
            body.acceleration = new Vector(0, this.GRAVITY);
            body.update(dt);
            this.applyConstraints(dt);
        }
    }

    applyConstraints(dt){
        for (let body of this.bodies){
            let diff = body.position.y+body.radius - this.height;
            if (diff > 0){
                let v2 = body.position.sum(body.previousPosition.mult(-1));
                body.position = new Vector(body.position.x, this.height - body.radius - diff);
                body.previousPosition = body.position.sum(v2.mult(body.restitution));
            }
        }
    }
}

var bodyUpdate = function(dt){
    let velocity = this.position.sum(this.previousPosition.mult(-1));
    this.previousPosition = this.position;
    this.position = this.position.sum(velocity).sum(this.acceleration.mult(dt*dt));
    this.acceleration = new Vector(0,0);
};