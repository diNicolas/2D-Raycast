let eimg;
let walls = [];
let ray;
let pt;
let particle;
let xoff = 0;
let yoff = 10000;



let sketch = function (p){


    p.windowResized = function () {
        p.resizeCanvas(p.displayWidth, p.displayHeight);
    }


    p.setup = function(){
        eimg = p.createCanvas( p.windowWidth, p.windowHeight);
        eimg.parent('p5');
     
        eimg.style('position', 'absolute');

        for(let i = 0; i < 5; i++){
            let x1 = p.random(p.width);
            let x2 = p.random(p.width);
            let y1 = p.random(p.height);
            let y2 = p.random(p.height);

            walls[i] = new Boundary(x1,y1,x2,y2);
        }

        /*walls.push( new Boundary(0,0,p.width,0));
        walls.push( new Boundary(p.width,0,p.width,p.height));
        walls.push( new Boundary(p.width,p.height,0 ,p.height));
        walls.push( new Boundary(0,p.height,0 ,0));*/
        
        particle = new Particle();
        
              

    }  

    p.draw = function(){
      p.background(0);
      for(let wall of walls){
        wall.show();
      }
      
      particle.update(p.noise(xoff)*p.width, p.noise(yoff)*p.height);
      particle.show();
      particle.look(walls);


      xoff += 0.01;
      yoff += 0.01;
      
       
    }


}


let myp5 = new p5(sketch);



