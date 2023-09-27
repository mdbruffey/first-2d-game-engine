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
            "velocity" : new Vector(0, 0),
            "acceleration" : new Vector(0, 0),
            "restitution" : .95,
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
                let root = body.velocity.y**2 - 2*this.GRAVITY*diff;
                if (root < 0 ) root = 0;
                let v1 = Math.sqrt(root);
                body.position = new Vector(body.position.x, this.height-body.radius);
                body.velocity = new Vector(body.velocity.x, -v1).mult(body.restitution);
                console.log(body.velocity);
            }
        }
    }
}

var bodyUpdate = function(dt){
    this.previousPosition = this.position;
    this.position = this.position.sum(this.velocity.mult(dt)).sum(this.acceleration.mult(0.5*dt*dt));
    this.velocity = this.velocity.sum(this.acceleration.mult(dt));
    this.acceleration = new Vector(0,0);
};