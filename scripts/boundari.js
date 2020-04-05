

//Boundary 

class Boundary{
    constructor(x1,y1,x2,y2){
        this.a = myp5.createVector(x1,y1);
        this.b = myp5.createVector(x2,y2);
    } 
    
    
    show = function(){
       myp5.stroke(255);
       myp5.line(this.a.x, this.a.y, this.b.x, this.b.y);
    }

}
