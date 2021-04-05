import ILoadable from "./ILoadable";

type ILoadableFactory = (document: Document) => ILoadable[];

export default ILoadableFactory;