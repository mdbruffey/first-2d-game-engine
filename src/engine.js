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
            "velocity" : new Vector(0,0),
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
                let v1y = Math.sqrt(body.velocity.y**2 - 2*this.GRAVITY*diff);
                let t1 = (v1y-body.previousVelocity.y)/this.GRAVITY;
                
                body.position = new Vector(body.position.x, body.position.y - body.radius).sum(body.velocity.mult(t1-dt));
                body.velocity = body.velocity.mult(-1).sum(body.acceleration.mult(dt-t1));
            }
        }
    }
}

var bodyUpdate = function(dt){
    //let velocity = this.position.sum(this.previousPosition.mult(-1));
    this.previousPosition = this.position;
    this.previousVelocity = this.velocity;
    this.position = this.position.sum(this.velocity.mult(dt));
    this.velocity = this.velocity.sum(this.acceleration.mult(dt));
    this.acceleration = new Vector(0,0);
};