import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 32, 32),
    new THREE.MeshBasicMaterial({ color: 'hsl(330, 100%, 65%)' })
)

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 32, 32),
    new THREE.MeshBasicMaterial({ color: 'hsl(330, 100%, 65%)' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 32, 32),
    new THREE.MeshBasicMaterial({ color: 'hsl(330, 100%, 65%)' })
)

const object4 = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 32, 32),
    new THREE.MeshBasicMaterial({ color: 'hsl(330, 100%, 65%)' })
)

scene.add(object1, object2, object3, object4)


// Raycaster
const raycaster = new THREE.Raycaster();


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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

// Mouse
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / sizes.width) * 2 - 1;
  mouse.y = -(e.clientY / sizes.height) * 2 + 1;
})


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // camera.position.x = Math.sin(elapsedTime * 6) * 4;
    // camera.position.z = Math.cos(elapsedTime * 6) * 4;

    object2.position.x = Math.sin(elapsedTime * 2) * 0.75;
    object2.position.y = Math.cos(elapsedTime * 2) * 0.75;

    object3.position.x = Math.sin(elapsedTime * -1) * 1.5;
    object3.position.y = Math.cos(elapsedTime * -1) * 1.5;

    object4.position.x = Math.sin(elapsedTime * 1) * 2.25;
    object4.position.y = Math.cos(elapsedTime * 1) * 2.25;

    // Cast a ray
    raycaster.setFromCamera(mouse, camera);

    const objectsToTest = [object1, object2, object3, object4];
    const intersects = raycaster.intersectObjects(objectsToTest);

    objectsToTest.forEach(object => object.material.color.set('#ff00ff'));
    intersects.forEach(intersect => intersect.object.material.color.set('#00ff00'));

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()