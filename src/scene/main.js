import * as THREE from 'three';

export class Scene {
  constructor() {
    const canvas = document.createElement("canvas");

    canvas.id = "c";
    document.body.appendChild(canvas);
    this.renderer = new THREE.WebGLRenderer({canvas});

    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 5;

    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    //position camera so that object is in view
    this.camera.position.z = 2;

    this.scene = new THREE.Scene();

    //define a box
    const boxWidth = 1;
    const boxDepth = 1;
    const boxHeight = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    //define light source
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1,2,4)
    this.scene.add(light);

    this.cubes = [
      this.makeInstance(geometry, 0x44aa88,  0),
      this.makeInstance(geometry, 0x8844aa, -2),
      this.makeInstance(geometry, 0xaa8844,  2),
    ];

    this.renderer.render(this.scene, this.camera);

    //requestAnimationFrame(this.render);
    window.webkitRequestAnimationFrame((time) => this.render(time));
  }

  makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color: 0xD52941});
    const cube = new THREE.Mesh(geometry, material);

    this.scene.add(cube);
    cube.position.x = x;

    return cube;
  }

  resizeRendererToDisplaySize() {
    const canvas = this.renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      this.renderer.setSize(width, height, false);
    }

    return needResize;
  }

  render(time) {
    time *= 0.001;  // convert time to seconds

    if (this.resizeRendererToDisplaySize()) {
      const canvas = this.renderer.domElement;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }

    this.cubes.forEach((cube, ndx) => {
      const speed = 1 * (ndx + 1);
      const rot = time * speed;

      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });
   
    this.renderer.render(this.scene, this.camera);
    window.webkitRequestAnimationFrame((time) => this.render(time));
  }
}