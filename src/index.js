window.onload = function () {
  console.log(THREE);
  /**
   * 1) scene
   */
  const scene = new THREE.Scene(); // scene은 three.js에서 콘테이너이다. objects, models, particles, lights 등을 담는다.

  /**
   * 2) Objects
   * 순서 : geometry, material 생성, mesh를 통해 둘을 결합하기, 결합한 mesh를 scene에 추가하기
   */
  //   const mesh = getDounut();
  const meshs = getManyObjects();
  scene.add(...meshs);

  // 3) Camera: 시점이라 생각하면 된다. 75도 정도가 사람과 유사하다.
  const sizes = {
    width: 800,
    height: 600,
  };

  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 50;
  scene.add(camera);

  // 4) Render
  const canvas = document.querySelector('canvas.webgl');

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);

  renderer.render(scene, camera);
};

const getDoorColorMaterial = () => {
  /**
   * Textures
   */
  const textureLoader = new THREE.TextureLoader();
  const doorColorTexture = textureLoader.load('./src/doorColor.jpeg');
  return new THREE.MeshBasicMaterial({ map: doorColorTexture });
};

const getWireframeMaterial = () => {
  /**
   * wireframe
   */
  const material = new THREE.MeshBasicMaterial();
  material.wireframe = true;
  material.transparent = true;
  material.opacity = 0.5;
  return material;
};

const getManyObjects = () => {
  const torus = getDounut();
  torus.position.x = 15;

  const material = new THREE.MeshBasicMaterial();

  const wireframeMaterial = getWireframeMaterial();
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 16, 16), wireframeMaterial);
  sphere.position.x = -15;

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), material);
  return [sphere, plane, torus];
};
const getDounut = () => {
  const torus = new THREE.TorusGeometry(3, 2, 16, 100);
  const material = new THREE.MeshBasicMaterial({ color: 'red' });
  return new THREE.Mesh(torus, material);
};
