import { DRACOLoader } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";


export class Loader extends GLTFLoader{


  constructor() {
    super();
    const draco = new DRACOLoader();
    draco.setDecoderPath( 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/' );
    draco.setDecoderConfig( { type: 'js' } );
    draco.preload();

    this.setDRACOLoader(draco);

  }

  async getComplete(path: string) {
    return await this.loadAsync(path);
  }

  async getModel(path: string) {
    const model = await this.loadAsync(path);
    return model.scene;
  }

}