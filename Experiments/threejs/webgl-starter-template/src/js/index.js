import * as THREE from "three";

export default class Sketch{
  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('container').appendChild( this.renderer.domElement );

    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, 0.1, 1000 );
    this.camera.position.z = 1;
    this.scene = new THREE.Scene();
    this.addMesh();
    this.time = 0;
    this.render();
  }

  addMesh() {
    this.geometry = new THREE.PlaneBufferGeometry(1,1);
    this.material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });

    this.mesh = new THREE.Mesh( this.geometry, this.material);
    this.scene.add( this.mesh );
  }
  
  render() {
    this.time++;
    console.log(this.time);

    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
    
    this.renderer.render( this.scene, this.camera );
    window.requestAnimationFrame(this.render.bind(this))
  }
}

new Sketch();