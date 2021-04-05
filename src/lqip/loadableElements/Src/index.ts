import ILoadable from "../ILoadable";
import IAssetLoader from "../../assetLoader/IAssetLoader"; 
import { removeLqipParamFromURL } from "../../urlUtilites";

export class Src implements ILoadable {

  private element: HTMLImageElement;
  private error: Error | undefined;

  constructor(element: HTMLImageElement) {
    this.element = element;
  }

  getElement() {
    return this.element;
  }

  load(assetLoader: IAssetLoader) : Promise<void> {
    var src = removeLqipParamFromURL(this.element.src);
    return assetLoader.loadAsset(src)
      .then(() => {
        this.element.src = src;
      })
      .catch(_ => {});
  }
}


export const SrcFactory = function srcFactory(document: Document) : Src[] {
  const loadables : Src[] = []
  document.querySelectorAll("img[src]")
    .forEach(function(element: HTMLImageElement){
      if ( element.src && element.src.includes("?lqip") || element.src.includes("&lqip") ) {
        loadables.push(new Src(element));
      }
    });
  return loadables;
}