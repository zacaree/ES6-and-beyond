import './style.css'
import * as THREE from 'three'

// 
// Canvas
// 
const canvas = document.querySelector('canvas.webgl')

// 
// Scene
// 
const scene = new THREE.Scene()

// 
// Objects
// 
const group = new THREE.Group();
group.rotation.x = Math.PI * 0.25;
scene.add(group);

const box1 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
box1.position.set(-2, 0, 0);
group.add(box1);

const box2 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
box2.position.set(0, 0, 0);
group.add(box2);

const box3 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
box3.position.set(2, 0, 0);
group.add(box3);

// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// mesh.position.set(1, 0, 0);
// mesh.scale.set(1, 0.5, 0.5);
// mesh.rotation.reorder('YXZ');
// mesh.rotation.x = Math.PI * 0.25;
// mesh.rotation.y = Math.PI * 0.25;
// scene.add(mesh); 


// 
// Axes helper
// 
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// 
// Sizes
// 
const sizes = {
  width: 800,
  height: 600
}

// 
// Camera
// 
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 4
// camera.lookAt(group.position);
scene.add(camera)

// 
// Renderer
// 
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)