import ILoadable from "../loadableElements/ILoadable";
import IAssetLoader from "../assetLoader/IAssetLoader";

export default interface IVisibilityListener {
  watch(loadables: ILoadable[]) : void,
}