import ILoadable from "../loadableElements/ILoadable";

export default interface IVisibilityListener {
  supported(): boolean,
  watch(loadables: ILoadable[]) : void,
}