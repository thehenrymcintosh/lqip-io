import {SrcFactory} from "./loadableElements/Src";
import {BackgroundImageFactory} from "./loadableElements/BackgroundImage";
import ILoadableFactory from "./loadableElements/ILoadableFactory";
import ILoadable from "./loadableElements/ILoadable";

class LqipLoader {
  private document: Document;
  private factories: ILoadableFactory[];
  private elements: ILoadable[];

  constructor(document: Document) {
    this.document = document;
    this.factories = [SrcFactory, BackgroundImageFactory];
  }

  init() {
    this.elements = [];
    for (const factory of this.factories) {
      this.elements.push(...factory(this.document));
    }
  }

  load() {
    const elements = [];
    for (const element of this.elements) {

    }
  }


}

export default LqipLoader;