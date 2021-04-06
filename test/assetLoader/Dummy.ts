import IAssetLoader from "../../src/lqip/assetLoader/IAssetLoader";

export default class DummyAssetLoader implements IAssetLoader {
  loadAsset(src: string) : never {
    throw new Error("Should not be called!");
  }
}