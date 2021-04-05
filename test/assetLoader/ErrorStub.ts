import IAssetLoader from "../../src/lqip/assetLoader/IAssetLoader";

export default class ErrorStubAssetLoader implements IAssetLoader {
  loadAsset(src: string) {
    return Promise.reject("Stubbed error!");
  }
}