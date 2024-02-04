import { GridHelper } from "three";
import { LifeCycle } from "../helpers/LifeCycle";
import { Food } from "./Food";
import { Snake } from "./Snake";


export class Diodrama implements LifeCycle {


  public food : Food
  public snake : Snake 
  public score : number = 0;
  public sizeGrid : number = 7;
  public grid: GridHelper = new GridHelper(this.sizeGrid, this.sizeGrid, 0x0000ff, 0x808080);


  constructor() {
    this.food = new Food("/apple.glb");
    this.food.init();
    this.snake = Snake.getInstance(this.sizeGrid);
  }

  public gameOver(fn: Function) {
    fn()
  }

  public startGame(fn: Function) {
    fn()
  }

  public restartGame(){
    this.score = 0;

    this.snake.removeBody();
    this.snake.init();
    this.snake.addBody();
    this.food.newPosition();
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