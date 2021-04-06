import IVisibilityListener from "./IVisibilityListener";
import IVisibilityListenerFactory from "./IVisibilityListenerFactory";
import ILoadable from "../loadableElements/ILoadable";
import IAssetLoader from "../assetLoader/IAssetLoader";

export class ManualVisibilityListener implements IVisibilityListener {
  private loadables: ILoadable[];
  private document: Document;
  private assetLoader: IAssetLoader; 

  constructor(document: Document, assetLoader: IAssetLoader){
    this.document = document;
    this.assetLoader = assetLoader;
  }

  watch(loadables: ILoadable[]) {
    this.loadables = loadables;
    window.addEventListener('scroll', () => { this.onScroll(); }, {passive: true});
    this.onScroll();
  }

  private onScroll() {
    const notYetLoaded: ILoadable[] = [];
    this.loadables.forEach( loadable => {
      if( this.isElementPartiallyInViewport(loadable.getElement()) ) {
        loadable.load(this.assetLoader);
      } else {
        notYetLoaded.push(loadable);
      }
    });
    this.loadables = notYetLoaded;
  }

  private isElementPartiallyInViewport(el: HTMLElement) {
    var rect = el.getBoundingClientRect();
    var windowHeight = (window.innerHeight || this.document.documentElement.clientHeight);
    var windowWidth = (window.innerWidth || this.document.documentElement.clientWidth);

    var vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    var horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

    return (vertInView && horInView);
  }
}

export default class ManualListenerFactory implements IVisibilityListenerFactory {
  supported() {
    return true;
  }

  create(document: Document, assetLoader: IAssetLoader) {
    return new ManualVisibilityListener(document, assetLoader);
  }
}