import IVisibilityListener from "./IVisibilityListener";
import ILoadable from "../loadableElements/ILoadable";

export default class ManualVisibilityCalculator implements IVisibilityListener {
  loadbles: ILoadable[];

  supported() {
    return true;
  }

  watch
}