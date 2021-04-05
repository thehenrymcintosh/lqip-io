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
    if (!this.element.style || !this.element.style.backgroundImage) {
      return;
    }
    const ogSrc = this.element.style.backgroundImage.split('"')[1];
    const src = removeLqipParamFromURL(ogSrc);
    return assetLoader.loadAsset(src)
      .then(() => {
        this.element.style.backgroundImage = `url("${src}")`;
      })
      .catch(_ => {});
  }
}



export const SrcSetFactory = function SrcSetFactory(document: Document) : SrcSet[] {
  return []
}