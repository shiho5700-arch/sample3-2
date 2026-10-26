import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// シーン、カメラ、レンダラーを作成
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// カメラの位置を設定
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

// OrbitControlsを追加​
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;


// ライトを追加
const light = new THREE.PointLight(0xffffff, 50, 10);
light.position.set(3, 3, 3);
scene.add(light);

// 座標軸を表示
const axesHelper = new THREE.AxesHelper(20);
scene.add(axesHelper);

class wheel extends THREE.Object3D { // Three.jsのObject3Dクラスを継承​
    constructor(radius, width, segments, color, x, y, z){
        super();

        this.geometry = new THREE.CylinderGeometry(
            radius,
            radius,
            width,
            segments
        );

        this.material = new THREE.MeshPhongMaterial({
            color: color
        });

        this.mesh = new THREE.Mesh(
            this.geometry,
            this.material
        );

        this.position.set(x, y, z);

        this.mesh.rotation.y = Math.PI / 2;
        this.mesh.rotation.z = Math.PI / 2;

        this.add(this.mesh);
    }

    rotateWheel(speed) {
        this.rotation.z += speed;
    }
  }

// 小さい車輪1
const wheel1 = new wheel(0.3, 0.1, 20, 0xffff00, 1.5, -0.8, 0.6);
// 小さい車輪2
const wheel2 = new wheel(0.3, 0.1, 20, 0xffff00, 2.2, -0.8, 0.6);


// 円筒
const cylinderGeometry = new THREE.CylinderGeometry( 0.8, 0.8, 2, 20 );
const cylinderMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
scene.add( cylinder );
cylinder.rotation.z = Math.PI / 2;


// 小さい車輪3
const wheel3 = new wheel(0.3, 0.1, 20, 0xffff00, 1.5, -0.8, -0.6);
// 小さい車輪4
const wheel4 = new wheel(0.3, 0.1, 20, 0xffff00, 2.2, -0.8, -0.6);


// 車輪1
const wheelBig1 = new wheel(0.5, 0.1, 20, 0xff0000, 3.5, -0.8, 1);
//const cylindergeometry1 = new THREE.CylinderGeometry( 0.5, 0.5, 0.1, 20 );
//const cylindermaterial1 = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
//const cylinder1 = new THREE.Mesh( cylindergeometry1, cylindermaterial1 );
//scene.add( cylinder1 );
//cylinder1.rotation.x = Math.PI / 2;

// 車輪2
const wheelBig2 = new wheel(0.5, 0.1, 20, 0xff0000, 3.5, -0.8, -1);
//const cylindergeometry2 = new THREE.CylinderGeometry( 0.5, 0.5, 0.1, 20 );
//const cylindermaterial2 = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
//const cylinder2 = new THREE.Mesh( cylindergeometry2, cylindermaterial2 );
//scene.add( cylinder2 );
//cylinder2.rotation.x = Math.PI / 2;

// 三角
const conegeometry = new THREE.ConeGeometry( 0.3, 0.5, 20 );
const conematerial = new THREE.MeshBasicMaterial( { color: 0x8b4513 } );
const cone = new THREE.Mesh(conegeometry, conematerial );
scene.add( cone );
cone.rotation.x = Math.PI;

// 立方体 
const cubeGeometry = new THREE.BoxGeometry(1.2, 2, 1.8); 
const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff }); 
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial); 

// グループを作成 
const group = new THREE.Group(); 

// 球と立方体をグループに追加 
group.add(cube); 
group.add(cylinder);
group.add(wheelBig1);
group.add(wheelBig2);
group.add(wheel1);
group.add(wheel2);
group.add(wheel3);
group.add(wheel4);
group.add(cone);

// それぞれの位置を設定  
cube.position.x = 3.5;
cube.position.y = 0.3;
cylinder.position.x = 2; 
//cylinder1.position.x = 3.5;
//cylinder1.position.z = 1;
//cylinder1.position.y = -0.8;
//cylinder2.position.x = 3.5;
//cylinder2.position.z = -1;
//cylinder2.position.y = -0.8;
cone.position.y = 0.9;
cone.position.x = 1.5;

// グループをシーンに追加 
scene.add(group); 

// アニメーション 
function animate() {
 requestAnimationFrame(animate); 
 // グループ全体をY軸の周りに回転 
 group.rotation.y += 0.01; 
 light.rotation.y += 0.01;
 renderer.render(scene, camera); 
} 
animate();
