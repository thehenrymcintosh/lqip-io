import IAssetLoader from "../assetLoader/IAssetLoader"; 


interface ILoadable {
  getElement(): HTMLElement,
  load(assetLoader: IAssetLoader): void,
}

export default ILoadable;