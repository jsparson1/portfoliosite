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



const geometry = new three.DodecahedronGeometry(5)
const material = new three.MeshStandardMaterial();

const meTexture = new three.TextureLoader().load('https://media.licdn.com/dms/image/C4D03AQFLcmpgPL3_lw/profile-displayphoto-shrink_400_400/0/1650312005800?e=1691020800&v=beta&t=MwmYtvClDCywsuKC2cSGrICpB_5R9lED-qfgaZztv-8');


const dodecahedron = new three.Mesh(
  new three.DodecahedronGeometry(7),
  new three.MeshBasicMaterial({ map: meTexture })
);

scene.add(dodecahedron);



const pointlight = new three.PointLight(0xffffff)
pointlight.position.set(10, 10, 10)
const ambientlight = new three.AmbientLight(0xffffff);
scene.add(pointlight);


const raycaster = new three.Raycaster();
const pointer = new three.Vector2();

function onPointerMove(event) {

  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  for (let i = 0; i < intersects.length; i++) {

    intersects[i].object.material.color.set(Math.random() * 0xffffff);

  }


}


window.addEventListener("click", onPointerMove);





function moveShape() {
  const t = document.body.getBoundingClientRect().top;
  dodecahedron.translateZ(1);
  camera.position.x = t * -0.0002;

}

document.body.onscroll = moveShape;
moveShape();

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  dodecahedron.rotation.x += 0.01;
  dodecahedron.rotation.y += 0.04;
  dodecahedron.rotation.z += 0.004;


  renderer.render(scene, camera);

}


animate()

