import {  WebGLRenderer } from "three";
import { SceneManager } from "./SceneManager";



export class Render  {

  public static instance: Render;
  private renderer: WebGLRenderer;

  private constructor() {
    SceneManager.init();
    this.renderer = this.init();
    this.onResize();
  }

  private init() {
    const renderer = new WebGLRenderer(
      { antialias: true, 
        alpha: true, 
        canvas: document.querySelector('#three') as HTMLCanvasElement
      }
    );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    console.log(renderer);
    return renderer
  }

  public loop() {
    this.renderer.render(SceneManager.scene, SceneManager.camera);
    requestAnimationFrame(this.loop.bind(this));
  }

  public onResize() {
    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      SceneManager.camera.update();
    });
  }

  public getRenderer(): WebGLRenderer {
    return this.renderer;
  }

  public static getInstance(): Render {
    if (!Render.instance) {
      Render.instance = new Render();
    }
    return Render.instance;
  }

}