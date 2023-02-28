import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import { DirectionalLight } from 'three';

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
// 캔버스
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  // 카메라 범위
  0.1,
  1000
);

// 카메라 조작
const orbit = new OrbitControls(camera, renderer.domElement);

// 좌표축 표시 (x: 빨강, y: 초록, z: 파랑)
const axeshelper = new THREE.AxesHelper(5);
scene.add(axeshelper);

// 카메라 위치
camera.position.set(-10, 30, 30);
orbit.update()

// 박스 개체
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00FFF0 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// 평면 개체
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

// 평면 위치
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

// 구 개체
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0000FF, wireframe: false }); // basic: 빛에 영향을 받지 않는다.
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-10, 10, 0);
sphere.castShadow = true;

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
scene.add(directionalLight);
directionalLight.position.set(-30, 50, 0);
directionalLight.castShadow = true;

// directLight 위치를 표시해주는 helper
const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(dLightHelper);

const gui = new dat.GUI();
const options = {
  sphereColor: '#FFEA00',
  wireframe: false,
  speed: 0.01
}

gui.addColor(options, 'sphereColor').onChange(function (e) {
  sphere.material.color.set(e);
});

gui.add(options, 'wireframe').onChange(function (e) {
  sphere.material.wireframe = e;
});

gui.add(options, 'speed', 0, 0.1);

let step = 0;


// 자동으로 돌아가는 애니메이션
function animate(time) {
  box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;

  step += options.speed;
  sphere.position.y = 10 * Math.abs(Math.sin(step));
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);