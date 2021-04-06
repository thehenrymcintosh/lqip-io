import ILoadable from "../ILoadable";
import IAssetLoader from "../../assetLoader/IAssetLoader"; 
import { removeLqipParamFromURL } from "../../urlUtilites";

export class SrcSet implements ILoadable {

  private element: HTMLImageElement;

  constructor(element: HTMLImageElement) {
    this.element = element;
  }

  getElement() {
    return this.element;
  }

  async load(assetLoader: IAssetLoader) : Promise<void> {
    if (!this.element.srcset) return;
    this.element.srcset = this.element.srcset.split(" ").map(removeLqipParamFromURL).join(" ");
  }
}



export const SrcSetFactory = function SrcSetFactory(document: Document) : SrcSet[] {
  const loadables : SrcSet[] = []
  document.querySelectorAll("img[srcset]")
    .forEach(function(element: HTMLImageElement){
      if ( element.srcset && ( element.srcset.includes("?lqip") || element.srcset.includes("&lqip") ) ) {
        loadables.push(new SrcSet(element));
      }
    });
  return loadables;
}