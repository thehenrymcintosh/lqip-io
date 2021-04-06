import ILoadableFactory from "./loadableElements/ILoadableFactory";
import ILoadable from "./loadableElements/ILoadable";
import IAssetLoader from "./assetLoader/IAssetLoader";
import IVisibilityListener from "./visibilityListeners/IVisibilityListener";

import {SrcFactory} from "./loadableElements/Src";
import {BackgroundImageFactory} from "./loadableElements/BackgroundImage";
import {SrcSetFactory} from "./loadableElements/SrcSet";

import AssetLoader from "./assetLoader/AssetLoader";
import ManualVisibilityFactory from "./visibilityListeners/manualListener";
import IntersectionObserverFactory from "./visibilityListeners/intersectionObserver";

class LqipLoader {
  private document: Document;
  private factories: ILoadableFactory[];
  private assetLoader: IAssetLoader;
  private visibilityListener: IVisibilityListener;

  constructor(document: Document, visibilityListener? : IVisibilityListener) {
    this.document = document;
    this.factories = [SrcFactory, BackgroundImageFactory, SrcSetFactory];
    this.assetLoader = new AssetLoader(document);
    this.visibilityListener = this.selectVisibilityListener(visibilityListener);
  }

  private selectVisibilityListener(visibilityListener? : IVisibilityListener): IVisibilityListener {
    if (visibilityListener) return visibilityListener;
    const visibilityListenerFactories = [
      new ManualVisibilityFactory(),
      new IntersectionObserverFactory(),
    ];
    return visibilityListenerFactories
      .find(factory => factory.supported())
      .create(this.document, this.assetLoader);
  }

  init() {
    let toLoad: ILoadable[] = [];
    for (const factory of this.factories) {
      toLoad = toLoad.concat(factory(this.document));
    }
    this.visibilityListener.watch(toLoad);
  }

}

export default LqipLoader;