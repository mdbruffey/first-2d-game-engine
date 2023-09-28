class Vector{
    #x;
    #y;

    constructor(x, y){
        this.#x = x;
        this.#y = y;
    }

    length(){
        return Math.hypot(this.#x, this.#y)
    }

    mult(num){
        return new Vector(this.#x * num, this.#y * num);
    }

    sum(vec){
        return new Vector(this.#x + vec.x, this.#y + vec.y);
    }

    get x() {
        return this.#x;
    }
    
    get y() {
        return this.#y;
    }

    dot(vec){
        return this.#x*vec.x + this.#y*vec.y
    }
    //this is NOT a true cross-product; returns a scalar value representing 
    //the magnitude of the cross-product in the z direction
    cross(vec){
        return this.#y*vec.x - this.#x*vec.y
    }
}