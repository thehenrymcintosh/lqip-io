export default interface IAssetLoader {
  loadAsset(url:string):Promise<void>
}