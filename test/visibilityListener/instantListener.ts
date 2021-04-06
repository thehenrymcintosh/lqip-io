import IVisibilityListener from "../../src/lqip/visibilityListeners/IVisibilityListener";
import ILoadable from "../../src/lqip/loadableElements/ILoadable";
import IAssetLoader from "../../src/lqip/assetLoader/IAssetLoader";

export default class InstantLoad implements IVisibilityListener {
  private assetLoader: IAssetLoader; 

  constructor(document: Document, assetLoader: IAssetLoader){
    this.assetLoader = assetLoader;
  }
  
  watch(loadables: ILoadable[]) : Promise<void[]> {
    const loadingPromises = loadables.map(loadable => loadable.load(this.assetLoader));
    return Promise.all( loadingPromises );
  }
}