import { Camera } from "./Camera";
import { Clock, DoubleSide, Group, HemisphereLight, Mesh, MeshLambertMaterial, PlaneGeometry, Scene, SphereGeometry, TextureLoader} from 'three';
import { Diodrama } from '../game/objects/Diodrama';
import { Loader } from "./Loader";
import { Render } from "./Render";

const loader = new Loader();

export class SceneManager {

  public static camera : Camera
  public static scene : Scene
  public static diodrama : Diodrama
  public static mainGroup : Group = new Group();


  public static init() {
    SceneManager.camera = new Camera();
    SceneManager.scene = new Scene();
    SceneManager.createDiodrama();
    SceneManager.createLight()
    SceneManager.setSkyBox();
    SceneManager.resize();
  }

  public static async setSkyBox() {


    const texture = new TextureLoader().load('/textures/space.jpeg')

    const skyBox = new Mesh(
      new SphereGeometry(100, 100, 100),
      new MeshLambertMaterial({map: texture, side: DoubleSide})
    );

    skyBox.scale.set(-1, 1, 1);
    skyBox.rotation.x = Math.PI / 180 * 90;
    skyBox.rotation.y = Math.PI / 180 * 180;


    console.log('skyBox', skyBox);
    SceneManager.scene.add(skyBox);

    const clock = new Clock();
    function animateSkyBoxRotation() {
      const delta = clock.getDelta();
      skyBox.rotation.y += 0.05 * delta;
    }

    function animateLoopRotation() {
      requestAnimationFrame(animateLoopRotation);
      animateSkyBoxRotation();
    }

    animateLoopRotation();

  }

  private static resize() {

    window.addEventListener('resize', () => {

      if(window.innerWidth < 860) {
        SceneManager.camera.position.set(0, 45, 0);
        SceneManager.mainGroup.position.set(0, 0, -4);
        Render.getInstance().onResize()
      }
      else {
        SceneManager.camera.position.set(0, 30, 0);
        Render.getInstance().onResize()
      }

    });


  }

  private static createLight() {
    if (!SceneManager.scene) throw new Error('Scene not initialized');
    const light = new HemisphereLight(0xffffbb, 0x080820, 1);
    SceneManager.scene.add(light);
  }

  private static async createDiodrama() {
    if (!SceneManager.scene) throw new Error('Scene not initialized');
    SceneManager.diodrama = new Diodrama();
    await SceneManager.diodrama.init();

    SceneManager.mainGroup.add(SceneManager.diodrama.snake.head);
    SceneManager.diodrama.snake.body.forEach((mesh: Mesh) => SceneManager.mainGroup.add(mesh))

    SceneManager.mainGroup.add(SceneManager.diodrama.grid);
    SceneManager.mainGroup.add(SceneManager.diodrama.food.food);

    const clock = new Clock();
    function animateGroupRotation() {
      const delta = clock.getDelta();
      //SceneManager.mainGroup.rotation.x += 0.5 * delta;
      SceneManager.mainGroup.rotation.y += 0.3 * delta;
    }


    const animateLoopRotation = () => {
      requestAnimationFrame(animateLoopRotation);
      animateGroupRotation();
    }

    animateLoopRotation();
  
    



    this.camera.position.set(0, 30, 0);
    this.camera.lookAt(SceneManager.mainGroup.position)
    SceneManager.mainGroup.rotation.x = Math.PI / 180 * -50;
    SceneManager.scene.add(SceneManager.mainGroup);
  }


}