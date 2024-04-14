import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

const geomtry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geomtry, material);

const pointLight = new THREE.PointLight(0xffffff, 15);
const ambientLight = new THREE.AmbientLight(0xffffff, 5);

// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);

pointLight.position.set(5, 5, 5);

const controls = new OrbitControls(camera, renderer.domElement);

function addStars() {
  const geomtry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

  const star = new THREE.Mesh(geomtry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStars);

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

const moonTexture = new THREE.TextureLoader().load("moon.webp");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
);

moon.position.z = 30;
moon.position.setZ(-10);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  camera.position.x = t * -0.01;
  camera.position.z = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

scene.add(pointLight, ambientLight, lightHelper, gridHelper, moon);

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
