import IAssetLoader from "../assetLoader/IAssetLoader";
import IVisibilityListener from "./IVisibilityListener";

export default interface IVisibilityListenerFactory {
  supported(): boolean,
  create(document: Document, assetLoader: IAssetLoader): IVisibilityListener,
}