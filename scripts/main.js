//Globals 
let scene,camera,renderer;
let vertex = new THREE.Vector3();
let light1, light2, light3, light4, light5, light6, light7, light8, light9, light10; 
let radius = 100, theta = 0;
let yRadius = 2;
var scene3d = document.getElementById("Full");

//scene geometry
let box;
let objects = [];

//Post Processing
let uniforms = {}; 
//*end Globals---------------------

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 1,1000);
    
    renderer = new THREE.WebGLRenderer({antialise: true, alpha: true});


    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);


    //scene.background = new THREE.Color( 0x040306 );
    scene3d.appendChild(renderer.domElement);


      //Ligths ------------------------------------------
      let hemiLight = new THREE.HemisphereLight(0x574d65, 0x49504d, 0);
      hemiLight.position.copy(new THREE.Vector3(0, 500, 0));

      hemiLight.name = 'hemiLight';
      scene.add(hemiLight);
         
      //point light ------------------------------------

      
      // LIGHTS
          let intensity = 50;
          let hintensity = 500;
          let distance = 100;
          let decay = 2.0;
          let c1 = 0xffffb3;
      
          let sphere = new THREE.SphereBufferGeometry( 0.5, 16, 8 );
          light1 = new THREE.PointLight( c1, intensity, distance, decay );
          light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c1 } ) ) );
          scene.add( light1 );
          light2 = new THREE.PointLight( c1, intensity, distance, decay );
          light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c1 } ) ) );
          scene.add( light2 );
          light3 = new THREE.PointLight( c1, intensity, distance, decay );
          light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c1 } ) ) );
          scene.add( light3 );
          light4 = new THREE.PointLight( c1, intensity, distance, decay );
          light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c1 } ) ) );
          scene.add( light4 );
          light5 = new THREE.PointLight( c1, intensity, distance, decay );
          light5.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c1 } ) ) );
          scene.add( light5 );
          light6 = new THREE.PointLight( c1, intensity, distance, decay );
          light6.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c1 } ) ) );
          scene.add( light6 );
          
          light7 = new THREE.PointLight( c1, hintensity, distance, decay );
          light7.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c1 } ) ) );
          scene.add( light7 );
          
          light8 = new THREE.PointLight( c1, hintensity, distance, decay );
          light8.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c1 } ) ) );
          scene.add( light8 );
          
          light9 = new THREE.PointLight( c1, hintensity, distance, decay );
          light9.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c1 } ) ) );
          scene.add( light9 );
          
          light10 = new THREE.PointLight( c1, hintensity, distance, decay );
          light10.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c1 } ) ) );
          scene.add( light10 );
      
      
          let dlight = new THREE.DirectionalLight( 0xffffff, 0.05 );
          dlight.position.set( 0.5, 1, 0 ).normalize();
          scene.add( dlight );

      
      //-----------------------------------------------------


    //Floor
     // floor ---------------------------------------------
     let floorGeometry = new THREE.PlaneBufferGeometry(2000, 2000, 100, 100);
     floorGeometry.rotateX(-Math.PI / 2);

        // vertex displacement

        let position = floorGeometry.attributes.position;

        for (var i = 0; i < position.count; i++) {

            vertex.fromBufferAttribute(position, i);

            vertex.x += Math.random() * 20 - 10;
            vertex.y += Math.random() * 2;
            vertex.z += Math.random() * 20 - 10;

            position.setXYZ(i, vertex.x, vertex.y, vertex.z);

        }

        let mat = new THREE.MeshPhongMaterial();
        mat.map = new THREE.TextureLoader().load( 'img/t_floor_03.png' );
        mat.flatShading = THREE.SmoothShading;
        mat.transparent = true;
        mat.map.wrapS = mat.map.wrapT = THREE.RepeatWrapping;
        mat.map.repeat.set(4, 4);
        mat.depthWrite = false;
        mat.side = THREE.DoubleSide;
        mat.color = new THREE.Color(0x424342);


         
        let floor = new THREE.Mesh(floorGeometry, mat);
        floor.receiveShadow = true;
        floor.castShadow = true; 
        scene.add(floor);



        //Color Shaders for Geometries
        let basicShader = THREE.ShaderLib['normal'];

        uniforms.delta = {type: 'f', value: 0.0};
        uniforms.mNear = {type: "f", value: 1.0};
        uniforms.mFar = {type: "f", value: 60.0};


        // since we use a texture, we need to inform three.js
        let material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: basicShader.vertexShader,
        fragmentShader: document.
        getElementById('simple-fragment').text,
        }); 
        

        // objects -------------------------------------------
        let boxGeometry = new THREE.BoxBufferGeometry(20, 20, 20);
        for (var i = 0; i < 500; i++) {
            box = new THREE.Mesh(boxGeometry, material);
            
            box.position.x = Math.random() * 800 - 400;
            box.position.y = Math.random() * 800 - 400;
            box.position.z = Math.random() * 800 - 400;
            box.rotation.x = Math.random() * 2 * Math.PI;
            box.rotation.y = Math.random() * 2 * Math.PI;
            box.rotation.z = Math.random() * 2 * Math.PI;
            box.scale.x = Math.random() + 0.5;
            box.scale.y = Math.random() + 0.5;
            box.scale.z = Math.random() + 0.5;
            box.castShadow = true;
            box.receiveShadow = true;
            scene.add(box);
            objects.push(box);
        }


                    
            composer = new POSTPROCESSING.EffectComposer(renderer);
            composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));

            const effectPass = new POSTPROCESSING.EffectPass(
            camera,
            new POSTPROCESSING.BloomEffect()
            );
            effectPass.renderToScreen = true;
            composer.addPass(effectPass);

                       


}//end init


function Animrender(){ 

     //stats.update(); 
     let time = Date.now() * 0.00025;
     let z = 20, d = 150;

     theta += 0.1;

     camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ));
     camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ));
     camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ));
     camera.lookAt( scene.position );

     camera.updateMatrixWorld();


   
        
        light1.position.x = Math.sin( time * 0.7 ) * d;
        light1.position.y = 15; 
        light1.position.z = Math.cos( time * 0.3 ) * d;
        light2.position.x = Math.cos( time * 0.3 ) * d;
        light2.position.y = 15; 
        light2.position.z = Math.sin( time * 0.7 ) * d;
        light3.position.x = Math.sin( time * 0.7 ) * d;
        light3.position.y = 15; 
        light3.position.z = Math.sin( time * 0.5 ) * d;
        light4.position.x = Math.sin( time * 0.3 ) * d;
        light4.position.y = 10; 
        light4.position.z = Math.sin( time * 0.5 ) * d;
        light5.position.x = Math.cos( time * 0.3 ) * d;
        light5.position.y = 10; 
        light5.position.z = Math.sin( time * 0.5 ) * d;
        light6.position.y = 10; 
        light6.position.x = Math.cos( time * 0.7 ) * d;
        light6.position.z = Math.cos( time * 0.5 ) * d;
        //High lighting
        light7.position.y = 100; 
        light7.position.x = Math.cos( time * 0.7 ) * d;
        light7.position.z = Math.cos( time * 0.5 ) * d;
        light8.position.y = 80; 
        light8.position.x = Math.cos( time * 0.2 ) * d;
        light8.position.z = Math.cos( time * 0.7 ) * d;
        light9.position.y = 65; 
        light9.position.x = Math.cos( time * 0.5 ) * d;
        light9.position.z = Math.cos( time * 0.3 ) * d;
        light10.position.y =95; 
        light10.position.x = Math.cos( time * 0.7 ) * d;
        light10.position.z = Math.cos( time * 0.2 ) * d;
    
    
}


function animate(){
    
    composer.render();
    requestAnimationFrame(animate);
    //renderer.render(scene,camera);
    uniforms.delta.value += 0.005;
    Animrender();
}


function onWindowResize(){
    camera.aspect = window.innerWidth/innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}

window.addEventListener('resize',onWindowResize,false);

init();
animate();

