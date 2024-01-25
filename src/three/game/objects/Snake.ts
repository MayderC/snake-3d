import { Mesh, MeshBasicMaterial, Vector3 } from "three";
import { LifeCycle } from "../helpers/LifeCycle";
import { RoundedBoxGeometry } from "three/examples/jsm/Addons.js";
import { SceneManager } from "@/three/setup/SceneManager";
import { Food } from './Food';



export class Snake implements LifeCycle {


  public body: Mesh[] = []
  private geometry : RoundedBoxGeometry = new RoundedBoxGeometry(1, 1, 1);
  private material : MeshBasicMaterial = new MeshBasicMaterial({ color: 0x00ff00});
  public head: Mesh = new Mesh(this.geometry, new MeshBasicMaterial({ color: 'red'})); 
  public tail : Mesh = new Mesh(this.geometry, this.material);
  private lastMove : string = 'ArrowUp';
  private iCanEat : boolean = false;
  private lastTailPosition = this.tail.position
  private oppositeDirection = new Map<string, string[]>(
    [
      ['ArrowUp', ['ArrowDown', 's']],
      ['ArrowDown', ['ArrowUp', 'w']],
      ['ArrowLeft', ['ArrowRight', 'd']],
      ['ArrowRight', ['ArrowLeft', 'a']],
      ['w', ['s', 'ArrowDown']],
      ['s', ['w', 'ArrowUp']],
      ['a', ['d', 'ArrowRight']],
      ['d', ['a', 'ArrowLeft']],
    ]
  )


  public static instance: Snake;

  public static getInstance() {
    if (!Snake.instance) {
      Snake.instance = new Snake();
    }

    return Snake.instance;
  }

  private constructor() {
    this.init();
  }

  public init() {
    const item1 = new Mesh(this.geometry, this.material);

    this.tail.scale.set(1/2, 1/2, 1/2);
    this.tail.position.set(0, 0, 2);
    this.tail.name = 'tail';

    item1.scale.set(1/2, 1/2, 1/2);
    item1.position.set(0, 0, 1);
    item1.name = 'body';
    
    this.head.scale.set(1/2, 1/2, 1/2);
    this.head.position.set(0, 0, 0);
    this.head.name = 'head';


    this.body.push(item1, this.tail);
    //this.move(this.lastMove);
  }

  public update() {
    // console.log('update');
  }

  

  private eat(food: Food) {
    this.iCanEat = false;
    SceneManager.mainGroup.remove(food.food);
    SceneManager.diodrama.food.newPosition();
    SceneManager.mainGroup.add(food.food);
    this.addTail();
  }

  private addTail() {
    const tailPosition = this.lastTailPosition
    const newTail = this.tail.clone();
    newTail.position.set(tailPosition.x, tailPosition.y, tailPosition.z);
    SceneManager.diodrama.snake.body.push(newTail);
    SceneManager.mainGroup.add(newTail);
    this.tail = newTail;
  }

  private canIEat(foodPosition: Vector3) {
    return this.head.position.x === foodPosition.x && this.head.position.z === foodPosition.z;
  }

  public move(direction : string, food: Food) {
    const currentPosition = new Vector3(this.head.position.x, this.head.position.y, this.head.position.z);
    const newPosition = new Vector3(this.head.position.x, this.head.position.y, this.head.position.z)
    const acceptedMoves = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 's', 'a', 'd'];
    
    if (!acceptedMoves.includes(direction)) return;
    if (this.oppositeDirection.get(direction)?.includes(this.lastMove)) return;
    
    if (['ArrowUp', 'w'].includes(direction)) {
      newPosition.z = currentPosition.z - 1;
    } else if ([ 'ArrowDown', 's'].includes(direction)) {
      newPosition.z = currentPosition.z + 1;
    } else if ([ 'ArrowLeft', 'a'].includes(direction)) {
      newPosition.x = currentPosition.x - 1;
    } else if ([ 'ArrowRight', 'd'].includes(direction)) {
      newPosition.x = currentPosition.x + 1;
    }
    this.lastMove = direction;

    if(this.ICrash(newPosition.x, newPosition.z))return
    this.head.position.set(newPosition.x, newPosition.y, newPosition.z);

    if(this.canIEat(food.food.position)) this.iCanEat = true;
    if (this.iCanEat) this.lastTailPosition = this.tail.position.clone();


    this.followHead(currentPosition);
    if (this.iCanEat) this.eat(food);
  }


  private ICrash(x: number, z: number) {
    if (x > 7 || x < -7) return true
    if (z > 7 || z < -7) return true;
    const h = this.head.position; const t = this.tail;
    return this.body.some((m: Mesh) => m.position.x === h.x && m.position.z === h.z)
  }


  private followHead(headPosition: Vector3) {
    for(let i = 0; i < this.body.length; i++) {
      const currentPosition = new Vector3(this.body[i].position.x, this.body[i].position.y, this.body[i].position.z);
      this.body[i].position.set(headPosition.x, headPosition.y, headPosition.z);
      headPosition.set(currentPosition.x, currentPosition.y, currentPosition.z);
    }
  }


  destroy(): void {
    throw new Error("Method not implemented.");
  }


}