import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'


// =============================
// Base
// =============================

// Debug
const gui = new dat.GUI({ width: 400 })
const guiParams = {
  ambientLightColor: 0x4ddc,
  pointLightColor: 0x8c7b76,
  moonlightColor: 0x89aaff,
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// =============================
// Textures
// =============================

const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load('./textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg');
const woodPlanksColorTexture = textureLoader.load('./textures/wood-planks/wood-planks-color.jpg');
const woodPlanksNormalTexture = textureLoader.load('./textures/wood-planks/wood-planks-normal.jpg');
const porchPlanksColorTexture = textureLoader.load('./textures/wood-planks/wood-planks-color.jpg');
const chimneyTopTexture = textureLoader.load('./textures/stone/stone-color.jpg');
const chimneyMiddleTexture = textureLoader.load('./textures/stone/stone-color.jpg');
const chimneyBaseTexture = textureLoader.load('./textures/stone/stone-color.jpg');


woodPlanksColorTexture.repeat.x = 2;
woodPlanksColorTexture.wrapS = THREE.RepeatWrapping;
woodPlanksColorTexture.wrapT = THREE.RepeatWrapping;
woodPlanksColorTexture.rotation = Math.PI * 0.5;

woodPlanksNormalTexture.repeat.x = 2;
woodPlanksNormalTexture.wrapS = THREE.RepeatWrapping;
woodPlanksNormalTexture.wrapT = THREE.RepeatWrapping;
woodPlanksNormalTexture.rotation = Math.PI * 0.5;

porchPlanksColorTexture.repeat.x = 4;
porchPlanksColorTexture.wrapS = THREE.RepeatWrapping;

chimneyTopTexture.repeat.x = 0.5;

chimneyMiddleTexture.repeat.x = 2;
chimneyMiddleTexture.repeat.y = 0.8;
chimneyMiddleTexture.wrapS = THREE.RepeatWrapping;

chimneyBaseTexture.repeat.x = 0.5;
chimneyBaseTexture.repeat.y = 0.5;

// porchPlanksColorTexture.wrapS = THREE.RepeatWrapping;
// porchPlanksColorTexture.wrapT = THREE.RepeatWrapping;
// porchPlanksColorTexture.repeat.y = 2;
// porchPlanksColorTexture.offset.x = 0.5
// porchPlanksColorTexture.offset.y = 1

// =============================
// House
// =============================

// Group
const house = new THREE.Group();
house.position.z = -1;
scene.add(house);

// Walls
const cabinBlockMain = new THREE.Mesh(
  new THREE.BoxGeometry(6, 3.5, 4, 80,80,80),
  new THREE.MeshStandardMaterial({ 
    map: woodPlanksColorTexture,
    normalMap: woodPlanksNormalTexture,
    normalScale: { x: 3, y: 3 },
  })
)
cabinBlockMain.position.y = 3.5 * 0.5;
house.add(cabinBlockMain);

const porchFloor = new THREE.Mesh(
  new THREE.BoxGeometry(6, 0.2, 1.5),
  new THREE.MeshStandardMaterial({
    map: porchPlanksColorTexture,
  })
)
porchFloor.position.y = 0.2 * 0.5;
porchFloor.position.z = (1.5 * 0.5) + 2
house.add(porchFloor);

const postGeometry = new THREE.BoxGeometry(0.12, 2.2, 0.12);
const postMaterial = new THREE.MeshStandardMaterial({ color: '#ac8e82' });

const post1 = new THREE.Mesh(postGeometry, postMaterial);
post1.position.x = (6 * 0.5) -0.1;
post1.position.y = 2.2 * 0.5;
post1.position.z = 3.4;
house.add(post1);

const post2 = new THREE.Mesh(postGeometry, postMaterial);
post2.position.x = -(6 * 0.5) + 0.1;
post2.position.y = 2.2 * 0.5;
post2.position.z = 3.4;
house.add(post2);

const post3 = new THREE.Mesh(postGeometry, postMaterial);
post3.position.x = -(2 * 0.5) + 0.1;
post3.position.y = 2.2 * 0.5;
post3.position.z = 3.4;
house.add(post3);

const post4 = new THREE.Mesh(postGeometry, postMaterial);
post4.position.x = (2 * 0.5) -0.1;
post4.position.y = 2.2 * 0.5;
post4.position.z = 3.4;
house.add(post4);

// Roof
const roofGeometry = new THREE.CylinderGeometry(1, 1, 6, 3);
const roofMaterial = new THREE.MeshStandardMaterial({ color: 'hsl(22, 82%, 22%)' });

const roofMain = new THREE.Mesh(roofGeometry, roofMaterial);
roofMain.rotation.reorder('YXZ');
roofMain.rotation.y = Math.PI * -0.5;
roofMain.rotation.x = Math.PI * -0.5;
roofMain.scale.x = 2.6
roofMain.position.y = 3.5 + (1 * 0.5);
house.add(roofMain);

const roofPorch = new THREE.Mesh(roofGeometry, roofMaterial);
roofPorch.rotation.reorder('YXZ');
roofPorch.rotation.y = Math.PI * -0.5;
roofPorch.rotation.x = Math.PI * -0.5;
roofPorch.scale.x = 2.6;
roofPorch.scale.y = 0.999;
roofPorch.position.y = 2.2 + (1 * 0.5);
roofPorch.position.z = 1.3
house.add(roofPorch);

// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2),
  new THREE.MeshStandardMaterial({ 
    map: doorColorTexture, 
    alphaMap: doorAlphaTexture,
    transparent: true
  })
)
door.position.z = 2 + 0.01;
door.position.y = 2.4 * 0.5;
house.add(door);

// Windows
const windowGeometry = new THREE.PlaneGeometry(1, 1);
const windowMaterial = new THREE.MeshStandardMaterial({ color: 'hsl(0, 0%, 40%)' });

const window1 = new THREE.Mesh(windowGeometry, windowMaterial)
window1.position.x = 1.8;
window1.position.y = 3 * 0.5;
window1.position.z = 2 + 0.01;
house.add(window1);

const window2 = new THREE.Mesh(windowGeometry, windowMaterial)
window2.position.x = -1.8;
window2.position.y = 3 * 0.5;
window2.position.z = 2 + 0.01;
house.add(window2);

// Chimney
const chimney = new THREE.Group();
chimney.position.x = -(0.8 * 0.5) -3;
house.add(chimney);

const chimneyBase = new THREE.Mesh(
  new THREE.BoxGeometry(0.8, 1.5, 1.5),
  new THREE.MeshStandardMaterial({ 
    map: chimneyBaseTexture 
  })
);
chimneyBase.position.y = 1.5 * 0.5;
chimney.add(chimneyBase);

const chimneyMiddle = new THREE.Mesh(
  new THREE.ConeGeometry(1.06, 2, 4),
  new THREE.MeshStandardMaterial({ 
    map: chimneyMiddleTexture 
  })
);
chimneyMiddle.rotation.y = Math.PI * 0.25
chimneyMiddle.position.y = (2 * 0.5) + 1.5;
chimneyMiddle.position.x = 0.35;
chimney.add(chimneyMiddle);

const chimneyTop = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 3.5, 1),
  new THREE.MeshStandardMaterial({ 
    map: chimneyTopTexture 
  })  
);
chimneyTop.position.x = 0.15;
chimneyTop.position.y = (3 * 0.5) + 2.1;
chimney.add(chimneyTop);


// Bushes
// const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
// const bushMaterial = new THREE.MeshStandardMaterial({ color: 'hsl(70, 12%, 35%)' });

// const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
// bush1.scale.set(0.7, 0.6, 0.7);
// bush1.position.set(-1.2, 0.4, 2.8);

// const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
// bush2.scale.set(0.5, 0.4, 0.4);
// bush2.position.set(-1.9, 0.2, 2.95);

// const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
// bush3.scale.set(0.6, 0.8, 0.6);
// bush3.position.set(1.3, 0.5, 2.8);

// const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
// bush4.scale.set(0.3, 0.3, 0.3);
// bush4.position.set(2, 0.2, 2.8);

// house.add(bush1, bush2, bush3, bush4);

// Graves
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.5, 0.8, 0.15);
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' });

for (let i = 0; i < 50; i++) {
  const angle = (Math.PI * 2) * Math.random();
  const circleRaduis = 5 + Math.random() * 4;
  const xPos = Math.cos(angle) * circleRaduis;
  const zPos = Math.sin(angle) * circleRaduis;
  const yPos = 0.1 + Math.random() * 0.3;

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.set(xPos, yPos, zPos);
  grave.rotation.x = (Math.random() - 0.5) * 0.2;
  grave.rotation.y = (Math.random() - 0.5) * 0.5;
  grave.rotation.z = (Math.random() - 0.5) * 0.2;
  graves.add(grave);
}


// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: '#a9c388' })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

// =============================
// Lights
// =============================

// Ambient light
const ambientLight = new THREE.AmbientLight(guiParams.ambientLightColor, 0.025)
scene.add(ambientLight)

gui.addColor(guiParams, 'ambientLightColor').onChange(() => {
  ambientLight.color.set(guiParams.ambientLightColor);
});
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('Ambient light intensity');


// Point light
const pointLight = new THREE.PointLight(guiParams.pointLightColor, 0.75, 6)
pointLight.position.set(0, 2, 2.5);
scene.add(pointLight)

gui.addColor(guiParams, 'pointLightColor').onChange(() => {
  pointLight.color.set(guiParams.pointLightColor);
})
gui.add(pointLight, 'intensity').min(0).max(1).step(0.001).name('Pointlight intensity');

// Directional light
const moonLight = new THREE.DirectionalLight(guiParams.moonlightColor, 0.13)
moonLight.position.set(4, 5, - 2)
scene.add(moonLight)

gui.addColor(guiParams, 'moonlightColor').onChange(() => {
  moonLight.color.set(guiParams.moonlightColor);
})
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001).name('Moonlight intensity');
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)

// =============================
// Sizes
// =============================

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// =============================
// Camera
// =============================

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -6
camera.position.y = 2
camera.position.z = 8
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// =============================
// Renderer
// =============================

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// =============================
// Animate
// =============================

const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // camera.position.x = Math.PI * Math.sin(elapsedTime * 0.5) * 2.5;
  // camera.position.z = Math.PI * Math.cos(elapsedTime * 0.5) * 2.5;
  // camera.position.y = Math.cos(elapsedTime * 0.25) + 4

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()