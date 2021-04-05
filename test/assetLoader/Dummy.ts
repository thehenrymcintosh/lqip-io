import IAssetLoader from "../../src/lqip/assetLoader/IAssetLoader";

export default class DummyAssetLoader implements IAssetLoader {
  loadAsset(src: string) {
    throw new Error("Should not be called!");
    return Promise.reject("Should not ever see this");
  }
}