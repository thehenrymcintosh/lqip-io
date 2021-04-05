import IAssetLoader from "./IAssetLoader";

export default class AssetLoader implements IAssetLoader {
  private document: Document;

  constructor(document: Document) {
    this.document = document;
  }

  async loadAsset(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      var loader = this.document.createElement("img");
      loader.src = src;
      loader.addEventListener('load',() => {
        loader.remove();
        resolve();
      });
      loader.addEventListener('error', (err) => {
        reject(err);
      })
    })
  }
}