import { DoubleSide, GridHelper, Mesh, MeshLambertMaterial, PlaneGeometry } from "three";
import { LifeCycle } from "../helpers/LifeCycle";
import { Food } from "./Food";
import { Snake } from "./Snake";


export class Diodrama implements LifeCycle {


  public food : Food
  public snake : Snake 
  public score : number = 0;
  public grid: GridHelper = new GridHelper(15, 15, 0x0000ff, 0x808080);


  constructor() {
    this.keyBoardListener();
    this.food = new Food("/apple.glb");
    this.snake = Snake.getInstance();
    this.food.init();
  }

  private keyBoardListener() {

    document.addEventListener('keydown', (event) => {
      this.snake.move(event.key, this.food);
    });
  }

  public async init() {
    this.grid.position.set(0, 0, 0);
    this.grid.scale.set(1, 1, 1);
    this.grid.rotation.x = Math.PI / 180 * 0;
    await this.food.getModelFood()
  }


  public update() {
    // console.log('update');
  }

  destroy(): void {
    throw new Error("Method not implemented.");
  }

}