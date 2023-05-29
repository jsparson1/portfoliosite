import './style.css'
import * as three from 'three';

const scene = new three.Scene();

const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new three.WebGLRenderer({
  canvas: document.querySelector('#background'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);


const geometry = new three.DodecahedronGeometry(5)
const material = new three.MeshStandardMaterial();

const meTexture = new three.TextureLoader().load('face.jpg');


const dodecahedron = new three.Mesh(
  new three.DodecahedronGeometry(7),
  new three.MeshBasicMaterial({ map: meTexture })
);

scene.add(dodecahedron);



const pointlight = new three.PointLight(0xffffff)
pointlight.position.set(10, 10, 10)
const ambientlight = new three.AmbientLight(0xffffff);
scene.add(pointlight);

function moveShape() {
  const t = document.body.getBoundingClientRect().top;
  dodecahedron.translateZ(1);
  camera.position.x = t * -0.0002;
  console.log(camera.position.x)

}

document.body.onscroll = moveShape;
moveShape();

function animate() {
  requestAnimationFrame(animate);
  dodecahedron.rotation.x += 0.01;
  dodecahedron.rotation.y += 0.04;
  dodecahedron.rotation.z += 0.004;


  renderer.render(scene, camera);

}


animate()

