import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const canvas = document.querySelector("#webgl");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight
);
camera.position.set(0, 1, 10);

let currentModel;

// Function to load and initialize a 3D model
function loadModel(modelPath) {
  if (currentModel) {
    scene.remove(currentModel);
  }

  const loader = new GLTFLoader();
  loader.load(modelPath, function (gltf) {
    currentModel = gltf.scene;
    scene.add(currentModel);
  });
}

// Example models
const models = {
  model1: "blacksmith.glb",
  model2: "oh_such_a_naughty_cat.glb",
  // Add more models as needed
};

// Load the initial model
loadModel(models.model2);

const light1 = new THREE.PointLight(0xffffff, 20, 100);
light1.position.set(50, 30, 50);
scene.add(light1);
const light1Helper = new THREE.PointLightHelper(light1);
scene.add(light1Helper);

const light2 = new THREE.PointLight(0xffffff, 10, 100);
light2.position.set(-50, 30, 50);
scene.add(light2);
const light2Helper = new THREE.PointLightHelper(light2);
scene.add(light2Helper);

const light3 = new THREE.PointLight(0xffffff, 2, 100);
light3.position.set(0, 30, -5);
scene.add(light3);
const light3Helper = new THREE.PointLightHelper(light3);
scene.add(light3Helper);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
