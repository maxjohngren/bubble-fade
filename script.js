// The three.js scene: the 3D world where you put objects
const scene = new THREE.Scene();

// The camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  10000
);

// The renderer: something that draws 3D objects onto the canvas
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xaaaccc, 1);
// Append the renderer canvas into <body>
document.body.appendChild(renderer.domElement);


// A cube we are going to animate
const cube = {
  // The geometry: the shape & size of the object
  geometry: new THREE.BoxGeometry(1, 1, 1),
  // The material: the appearance (color, texture) of the object
  material: new THREE.MeshBasicMaterial({ color: 0x00ff00 })
};

// The mesh: the geometry and material combined, and something we can directly add into the scene (I had to put this line outside of the object literal, so that I could use the geometry and material properties)
cube.mesh = new THREE.Mesh(cube.geometry, cube.material);

// Add the cube into the scene
scene.add(cube.mesh);

// Make the camera further from the cube so we can see it better
camera.position.z = 5;

function createSphere(scene){
  // now, create a sphere
  const sphere = {
    // The geometry: the shape & size of the object
    geometry: new THREE.SphereGeometry( .12, 30, 30 ),
    // The material: the appearance (color, texture) of the object
    material: new THREE.MeshBasicMaterial( {color: 0x1100ff} ),

    // give each sphere a property called fade
    fade: 0
      
  };
  
  
  
  // The mesh: the geometry and material combined, and something we can directly add into the scene (
  sphere.mesh = new THREE.Mesh(sphere.geometry, sphere.material);
  // Add the sphere into the scene
  scene.add(sphere.mesh);
  return sphere
}

var spheres = []

for (var i = 0; i < 100; i++){
  var sphere = createSphere(scene)
  spheres.push(sphere)
  sphere.mesh.position.x = (Math.random() * 5 - 2.5)
  sphere.mesh.position.z = (Math.random() * 5 - 2.5)
}




function render() {
  // Render the scene and the camera
  renderer.render(scene, camera);

  // make all the spheres rise on the y axis
  for (var i = 0; i < spheres.length; i++) {
    spheres[i].mesh.position.y += 0.01
    if (spheres[i].mesh.position.y > Math.random() * 200){
      spheres[i].mesh.position.y = -3
      spheres[i].mesh.position.x = (Math.random() * 5 - 2.5)
      spheres[i].mesh.position.z = (Math.random() * 5 - 2.5)
    }
  }

  

  // make the spheres fade in and out of opacity
  for (var i = 0; i < spheres.length; i ++) {

    var opac = spheres[i].mesh.material.opacity
    var fade = spheres[i].fade
    
    // case: starting point
    if (fade == 0) {
      toggle = Math.random()
      if (toggle <= 0.006) {
        spheres[i].fade = -1
      } 
    } 

    // case: opacity hits 0
    else if (opac <= 0) {
      spheres[i].mesh.material.opacity = 0.005
      spheres[i].fade = 1
    }

    // case: opacity > 0, fading in
    else if (1 > opac > 0 && fade == 1) {
      spheres[i].mesh.material.opacity += Math.random() * 0.005
    }

    // case: opacity > 0, fading out
    else if (opac > 0 && fade == -1) {
      spheres[i].mesh.material.opacity -= Math.random() * 0.01
    }

    // case: opacity = 1, fading in
    else if (opac >= 1 && fade == 1) {
      spheres[i].mesh.material.opacity -= Math.random() * 0.005
      spheres[i].fade = -1
    }

    else {console.log("uh oh")}

    spheres[i].mesh.material.transparent = true


    //toggle = Math.random()
    //if (toggle <= 0.5) {
      //spheres[i].mesh.material.opacity -= Math.random() * 0.08
    //} else {
      //spheres[i].mesh.material.opacity += Math.random() * 0.08
    //}

    //spheres[i].mesh.material.color.setHSL(Math.random(), 1,.5)
  }


  // Rotate the cube every frame
  cube.mesh.rotation.x += 0.01;
  cube.mesh.rotation.y -= 0.01;

  // Make it call the render() function about every 1/60 second
  requestAnimationFrame(render);
}

render();