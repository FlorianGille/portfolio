import "./style.css";
import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const image = new Image();
const texture = new THREE.Texture(image);

image.onload = () => {
  texture.needsUpdate = true;
};

image.src = "/textures/totor-1.png";

const image2 = new Image();
const texture2 = new THREE.Texture(image2);

image2.onload = () => {
    texture2.needsUpdate = true;
};

image2.src = "/textures/yoann-1.png";

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: texture2 });
const material2 = new THREE.MeshBasicMaterial({ map: texture });

const mesh = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry, material2);
mesh.position.x = -2;
mesh.position.y = -2;
mesh.position.z = 0.2;
mesh2.position.x = 0.9;
mesh2.position.y = -0.7;
mesh2.position.z = 0.5;

scene.add(mesh, mesh2);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

let negative = false;
let dirX = Math.random() / 10;
let dirY = Math.random() / 10;

let negative2 = false;
let dirX2 = Math.random() / 10;
let dirY2 = Math.random() / 10;

let frustum = new THREE.Frustum();
const tick = () => {
  mesh.position.y += negative ? dirX * -1 : dirX;
  mesh.position.x += negative ? dirY * -1 : dirY;

  mesh2.position.y += negative2 ? dirX2 * -1 : dirX2;
  mesh2.position.x += negative2 ? dirX2 * -1 : dirX2;

  mesh2.rotation.x += Math.random() / 10;

  camera.updateMatrix();
  camera.updateMatrixWorld();
  frustum.setFromProjectionMatrix(
    new THREE.Matrix4().multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    )
  );
  if (!frustum.containsPoint(mesh.position)) {
    dirX = Math.random() / 10;
    dirY = Math.random() / 10;

    negative = !negative;
  }
  if (!frustum.containsPoint(mesh2.position)) {
    dirX2 = Math.random() / 10;
    dirY2 = Math.random() / 10;
    negative2 = !negative2;
  }
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
