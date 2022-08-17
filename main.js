import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'), 
}); 

renderer.setPixelRatio(window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30); 
camera.position.setX(-3); 

renderer.render(scene, camera); 

//constructs torus geometry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347}); 
const torus = new THREE.Mesh(geometry, material); 
scene.add(torus)

//constructs RING geometry
const geometry1 = new THREE.RingGeometry( 5, 20, 8, 8, 0);
const material1 = new THREE.MeshBasicMaterial( { color: 0xFF6347, side: THREE.DoubleSide } );
const ring = new THREE.Mesh(geometry1, material1); 
scene.add(ring)

//ADDS POINT + AMBIENT LIGHT
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

//ADDS LIGHT HELPER GRIDS
//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper)

//const controls = new OrbitControls(camera, renderer.domElement); 

//CUBE CONSTRUCT
const faceTexture = new THREE.TextureLoader().load('/static/img/face.jpg');
const face = new THREE.Mesh(new THREE.BoxGeometry(6,6,6), new THREE.MeshBasicMaterial({ map: faceTexture}));
scene.add(face); 
face.position.z = -5;
face.position.x = 2; 

//ADD STARS FUNCTION
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff});
  const star = new THREE.Mesh(geometry, material); 

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));
  star.position.set(x, y, z);
  scene.add(star); 
}
Array(200).fill().forEach(addStar); 

//ADDS SPACE BACKGROUND AS TEXTURE LOADER
const spaceTexture = new THREE.TextureLoader().load('/static/img/space.jpg'); 
scene.background = spaceTexture;

//ADD Icosahedron FUNCTION
function addIcosahedron() {
  const geometry = new THREE.IcosahedronGeometry(2, 0);
  const material = new THREE.MeshStandardMaterial({ color: 0x8AC974});
  const icosahedron = new THREE.Mesh(geometry, material); 

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));
    icosahedron.position.set(x, y, z);
    icosahedron.rotateOnAxis;
    scene.add(icosahedron); 
}
Array(120).fill().forEach(addIcosahedron); 

//ADD MOON FUNCTION
const moonTexture = new THREE.TextureLoader().load('/static/img/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('/static/img/normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
); 
scene.add(moon); 
moon.position.z = 30;
moon.position.setX(-10); 

//MOVES OBJECTS AND CAMERA WHEN SCROLL IS MADE
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  torus.rotation.x += 0.05;
  torus.rotation.y += 0.075;
  torus.rotation.z += 0.05;


  ring.rotation.x += 0.05;
  ring.rotation.y += 0.075;
  ring.rotation.z += 0.05;

  face.rotation.y += 0.01;
  face.rotation.z += 0.01;

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  camera.position.z = t*-0.01;
  camera.position.x = t*-0.0002;
  camera.position.y = t*-0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

//ANIMATE LOOPS 
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  face.rotation.x += 0.01;
  face.rotation.y += 0.005;
  face.rotation.z += 0.01;

  ring.rotation.x += 0.01;
  ring.rotation.y += 0.005;
  ring.rotation.z += 0.01;



  renderer.render(scene, camera); 
}

animate()

