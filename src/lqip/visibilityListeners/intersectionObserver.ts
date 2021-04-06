import IVisibilityListener from "./IVisibilityListener";
import IVisibilityListenerFactory from "./IVisibilityListenerFactory";
import ILoadable from "../loadableElements/ILoadable";
import IAssetLoader from "../assetLoader/IAssetLoader";

export class IntersectionObserverListener implements IVisibilityListener {
  private loadables: ILoadable[];
  private document: Document;
  private assetLoader: IAssetLoader; 
  private observer?: IntersectionObserver;

  constructor(document: Document, assetLoader: IAssetLoader){
    this.document = document;
    this.assetLoader = assetLoader;
  }

  watch(loadables: ILoadable[]) {
    this.loadables = loadables;
    let options = {
      root: this.document,
    }
    this.observer = new IntersectionObserver((entries, observer) => this.handleIntersection(entries, observer), options);
    this.loadables.forEach(loadable => {
      this.observer.observe(loadable.getElement());
    })
  }

  private handleIntersection(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach(entry => {
      const element = entry.target;
      observer.unobserve(element);
      const loader = this.loadables.find(loadable => loadable.getElement().isSameNode(element));
      if (loader) {
        loader.load(this.assetLoader);
      }
    })
  }

}

export default class IntersectionObserverFactory implements IVisibilityListenerFactory {
  supported() {
    return !(
      !('IntersectionObserver' in window) ||
      !('IntersectionObserverEntry' in window) ||
      !('intersectionRatio' in window.IntersectionObserverEntry.prototype)
    ) 
  }

  create(document: Document, assetLoader: IAssetLoader) {
    return new IntersectionObserverListener(document, assetLoader);
  }
}