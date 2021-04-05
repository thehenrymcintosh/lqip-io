import IAssetLoader from "../../src/lqip/assetLoader/IAssetLoader";

export default class SuccessStubAssetLoader implements IAssetLoader {
  loadAsset(src: string) {
    return Promise.resolve();
  }
}