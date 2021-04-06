import IAssetLoader from "../assetLoader/IAssetLoader"; 


interface ILoadable {
  getElement(): HTMLElement,
  load(assetLoader: IAssetLoader): Promise<void>,
}

export default ILoadable;