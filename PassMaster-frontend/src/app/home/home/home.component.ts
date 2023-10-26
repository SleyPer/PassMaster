import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private model!: THREE.Object3D;

  constructor(private router: Router, private authService: AuthService, private ngZone: NgZone) { }

  ngOnInit() {
    this.isAuthenticated();
    this.initScene();
    this.loadModel();
    this.animate();
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.deleteToken();

  }

  register() {
    this.router.navigate(['/register']);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  initScene() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    document.body.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;
  }

  loadModel() {
    const loader = new GLTFLoader();

    loader.load('assets/padlock/scene.gltf', (gltf: any) => {
      this.model = gltf.scene;
      this.scene.add(this.model);

      this.model.traverse((child : any) => {
        if (child.isMesh) {
            const texture = new THREE.TextureLoader().load('assets/padlock/textures/MAT_Cadenas_Body_baseColor.jpeg');
            child.material.map = texture;
        }
    });

      this.camera.position.set(0, 0, 2);
      this.camera.lookAt(0, 0, 0);
    });
  }

  animate() {
    this.ngZone.run(() => {
      requestAnimationFrame(() => this.animate());
      if (this.model) {
        this.model.rotation.x += 0.01;
        this.model.rotation.y += 0.01;
      }
      this.renderer.render(this.scene, this.camera);
    });
  }
}
