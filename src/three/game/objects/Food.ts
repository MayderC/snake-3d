import { Mesh, Object3D, Object3DEventMap, PointLight } from "three";
import { LifeCycle } from "../helpers/LifeCycle";
import { Loader } from "@/three/setup/Loader";


export class Food implements LifeCycle {

  
  private BaseFood : Object3D | null
  public food : any
  public path: string
  public sizeFood: number = 1/21;
  public stepMove: number = 1/7;

  constructor(path: string ) {

    this.path = path;
    this.BaseFood = null;
    this.food = null;
  }

  getRandomInt() {
    return Math.floor(Math.random() * 15) - 7;
  }

  private setDefaultProperties() {
    this.food = this.BaseFood?.clone();
    this.newPosition();
    this.food.scale.set(1/3, 1/3, 1/3);
    this.food.rotation.x = Math.PI / 180 * 0;
  }

  public newPosition() {
    this.food.position.set(this.getRandomInt(), 0, this.getRandomInt());
  }

  async getModelFood() {
    const loader = new Loader();
    const model = await loader.getModel(this.path);
    this.BaseFood = model;
    this.BaseFood.traverse((obj) => {
      if (obj instanceof Mesh) {
        if(obj.name === 'Esfera_apple_0')obj.material.emissive.set('red');
        if(obj.name === 'Esfera_palo_0')obj.material.emissive.set('brown');
        if(obj.name === 'Esfera_hoja_0')obj.material.emissive.set('green');
      }
    });
    this.setDefaultProperties();
  }




  init() {
    


  }
  update(): void {
    throw new Error("Method not implemented.");
  }
  destroy(): void {
    throw new Error("Method not implemented.");
  }
}