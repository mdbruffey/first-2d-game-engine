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
            "mass" : 1,
            "position" : new Vector(x, y),
            "previousPosition" : new Vector(x, y),
            "velocity" : new Vector(0, 0),
            "acceleration" : new Vector(0, 0),
            "restitution" : 1,
            "fixed" : false,
            "update" : bodyUpdate,
            "color" : "#FF0000",
            ...options
        };
        this.bodies.push(newCircle);
        return newCircle;
    }

    step(dt){
        for (let body of this.bodies){
            if(!body.fixed){
                body.acceleration = new Vector(0, this.GRAVITY);
                body.update(dt);
                this.applyConstraints(dt);
                this.checkCollisions();
            }
        }
    }

    applyConstraints(dt){
        for (let body of this.bodies){
            //bottom of the box
            let diff = body.position.y+body.radius - this.height;
            if (diff > 0){
                let root = body.velocity.y**2 - 2*this.GRAVITY*diff;
                if (root < 0 ) root = 0;
                let v1 = Math.sqrt(root);
                body.position = new Vector(body.position.x, this.height-body.radius);
                body.velocity = new Vector(body.velocity.x, -v1*body.restitution);
            }
            //right side of the box
            if(body.position.x + body.radius > this.width){
                body.position = new Vector(this.width - body.radius, body.position.y);
                body.velocity = new Vector(-body.velocity.x*body.restitution, body.velocity.y)
            }
            //left side of the box
            if(body.position.x < body.radius){
                body.position = new Vector(body.radius, body.position.y);
                body.velocity = new Vector(-body.velocity.x*body.restitution, body.velocity.y)
            }
            //top of the box
            if(body.position.y < body.radius){
                body.position = new Vector(body.position.x, body.radius);
                body.velocity = new Vector(body.velocity.x, -body.velocity.y*body.restitution)
            }
        }
    }

    checkCollisions(){
        for (let i = 0; i < this.bodies.length; i++){
            if (this.bodies[i].fixed) continue;
            for (let j = 0; j < this.bodies.length; j++){
                if (i === j) continue;

                let bodyA = this.bodies[i];
                let bodyB = this.bodies[j];

                let diff = bodyB.position.sum(bodyA.position.mult(-1));
                let dist = diff.length();

                if (dist < bodyA.radius + bodyB.radius){
                    let n = diff.mult(1/dist);
                    let delta = bodyA.radius + bodyB.radius - dist;
                    let restitution = bodyA.restitution*bodyB.restitution
                    
                    if(!bodyB.fixed){
                        let  r = diff.mult(-(bodyA.radius/(bodyA.radius + bodyB.radius)));
                        let j = -1*(1+restitution)*bodyA.velocity.dot(n)/(1/bodyA.mass + 1/bodyB.mass + (r.cross(n)**2) + (r.mult(-1).cross(n)**2))
                        bodyA.position = bodyA.position.sum(n.mult(-0.5*delta));
                        bodyA.velocity = bodyA.velocity.sum(n.mult(j/bodyA.mass));
                        bodyB.position = bodyB.position.sum(n.mult(0.5*delta));
                        bodyB.velocity = bodyB.velocity.sum(n.mult(-j/bodyB.mass));
                    }
                    else{
                        bodyA.position = bodyA.position.sum(n.mult(-delta));
                        let d = bodyA.velocity.mult(restitution)
                        //Reflected velocity vector r = d - 2(d⋅n)n
                        bodyA.velocity = d.sum(n.mult(-2*d.dot(n)));
                    }

                }
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