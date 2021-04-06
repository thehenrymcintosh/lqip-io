import ILoadable from "../loadableElements/ILoadable";
export default interface IVisibilityListener {
  watch(loadables: ILoadable[]) : void,
}