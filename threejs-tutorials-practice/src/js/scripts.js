import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import { DirectionalLight } from 'three';

import nebula from '../img/nebula.jpg';
import stars from '../img/stars.jpg';

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

// AmbientLight
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// // DirectionalLight
// const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
// scene.add(directionalLight);
// directionalLight.position.set(-30, 50, 0);
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.bottom = -12;
// // directLight 위치를 표시해주는 helper
// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(dLightHelper);
// // directLight의 shadow 위치를 표시해주는 helper
// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper);

// SpotLight
// spotLight 클래스의 인스턴스를 선언한다.
const spotLight = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);
spotLight.position.set(-100, 100, 0);
// 앵글이 너무 넓으면 그림자가 pixel화 되어 보인다.
spotLight.castShadow = true;
spotLight.angle = 0.2;
// spotLight helper
const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);

// 배경색 설정
// renderer.setClearColor(0xFFEA00);

// 배경 이미지 설정
const textureLoader = new THREE.TextureLoader();
// scene.background = textureLoader.load(stars);
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  nebula, nebula, stars, stars, stars, stars
]);

// 개체에 texture 적용하기
const box2Geometry = new THREE.BoxGeometry(4, 4, 4);
const box2Material = new THREE.MeshStandardMaterial({
  // color: 0x00FF00,
  // map: textureLoader.load(nebula)
});
const box2MultiMaterial = [
  new THREE.MeshStandardMaterial({ map: textureLoader.load(stars) }),
  new THREE.MeshStandardMaterial({ map: textureLoader.load(stars) }),
  new THREE.MeshStandardMaterial({ map: textureLoader.load(nebula) }),
  new THREE.MeshStandardMaterial({ map: textureLoader.load(stars) }),
  new THREE.MeshStandardMaterial({ map: textureLoader.load(nebula) }),
  new THREE.MeshStandardMaterial({ map: textureLoader.load(stars) }),
]
const box2 = new THREE.Mesh(box2Geometry, box2MultiMaterial);
scene.add(box2);
box2.position.set(0, 15, 10);
box2.material.map = textureLoader.load(nebula);

// Fog: 멀어질수록 화면에 안개가 낀다. 
// scene.fog = new THREE.Fog(0xFFFFFF, 0, 200);
// 멀어질수록 기하급수적으로 흐려지는 Fog
// scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01);

const gui = new dat.GUI();
const options = {
  sphereColor: '#FFEA00',
  wireframe: false,
  speed: 0.01,
  angle: 0.2,
  penumbra: 0,
  intensity: 0.1,
}

gui.addColor(options, 'sphereColor').onChange(function (e) {
  sphere.material.color.set(e);
});

gui.add(options, 'wireframe').onChange(function (e) {
  sphere.material.wireframe = e;
});

gui.add(options, 'speed', 0, 0.1);
gui.add(options, 'angle', 0, 1);
gui.add(options, 'penumbra', 0, 1);
gui.add(options, 'intensity', 0, 1);

let step = 0;

// 자동으로 돌아가는 애니메이션
function animate(time) {
  box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;

  step += options.speed;
  sphere.position.y = 10 * Math.abs(Math.sin(step));

  spotLight.angle = options.angle;
  spotLight.penumbra = options.penumbra;
  spotLight.intensity = options.intensity;
  // light의 property가 변경되면 helper도 꼭 업데이트 해주어야 한다.
  sLightHelper.update();

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);