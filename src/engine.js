class Engine{
    bodies;

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
            "update" : bodyUpdate,
            "color" : "#FF0000",
            ...options
        };
        this.bodies.push(newCircle);
        return newCircle;
    }

    step(dt){
        for (let body of this.bodies){
            body.acceleration = new Vector(0,981);
            body.update(dt);
            this.applyConstraints();
        }
    }

    applyConstraints(){
        for (let body of this.bodies){
            let diff = this.height-body.position.y;
            if (diff < body.radius){
                body.position = new Vector (body.position.x, this.height-Math.abs(parseInt(body.position.y - body.previousPosition.y)) - body.radius);
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