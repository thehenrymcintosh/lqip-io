import ILoadable from "../ILoadable";
import IAssetLoader from "../../assetLoader/IAssetLoader"; 
import { removeLqipParamFromURL } from "../../urlUtilites";

export class BackgroundImage implements ILoadable {

  private element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  getElement() {
    return this.element;
  }

  async load(assetLoader: IAssetLoader) : Promise<void> {
    if (!this.element.style || !this.element.style.backgroundImage) {
      return;
    }
    const backgroundImage = this.element.style.backgroundImage;

    const ogSrc = backgroundImage.slice(4, -1).replace(/["']/g, "");
    const src = removeLqipParamFromURL(ogSrc);
    return assetLoader.loadAsset(src)
      .then(() => {
        this.element.style.backgroundImage = `url("${src}")`;
      })
      .catch(_ => {});
  }
}


export const BackgroundImageFactory = function BackgroundImageFactory(document: Document) : BackgroundImage[] {
  const loadables : BackgroundImage[] = []
  document.querySelectorAll("[style]")
    .forEach(function(element: HTMLElement){
      if ( element.style.backgroundImage.includes("?lqip") || element.style.backgroundImage.includes("&lqip") ) {
        loadables.push(new BackgroundImage(element));
      }
    });
  return loadables;
}