class Particle{
    constructor(){
        this.pos = myp5.createVector(myp5.width/2 , myp5.height/2);
        this.rays = [];
        for(let a = 0; a < 360; a += 1){
            this.rays.push(new Ray (this.pos, myp5.radians(a)));

        }
    }

    update(x,y){
        this.pos.set(x,y);
    }

    look(walls){
        for(let ray of this.rays){
            let closest = null;
            let record = Infinity;
            for(let wall of walls){
                const pt = ray.cast(wall);
                if(pt){
                    const d = p5.Vector.dist(this.pos,pt);
                    if(d < record){
                        record = d;
                        closest = pt;
                    }
                }
            }
            if(closest){
                myp5.stroke(250, 239, 182,);
                myp5.line(this.pos.x, this.pos.y, closest.x, closest.y);

            }
        }
    }


    show(){
        myp5.fill(255);
        myp5.ellipse(this.pos.x, this.pos.y, 4);
        for(let ray of this.rays){
            ray.show();
        }



    }
}