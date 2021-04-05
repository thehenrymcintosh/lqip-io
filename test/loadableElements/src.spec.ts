import {Src, SrcFactory} from "../../src/lqip/loadableElements/Src";
import {expect} from "chai";
import { describe, it } from "mocha";
import {ErrorStubAssetLoader, SuccessStubAssetLoader }from "../assetLoader";
import createDom from "../dom";

describe("Src", () => {
  it("Should load SRC string correctly", async () => {
    var element = { src: "https://test.lqip.app?lqip&w=500" } as HTMLImageElement;
    const assetLoader = new SuccessStubAssetLoader();

    const src = new Src(element);
    await src.load(assetLoader);
    expect(src.getElement()).to.equal(element);
    expect(src.getElement().src).to.equal("https://test.lqip.app?w=500")
  });

  it("Should not update src if can't load new src", async () => {
    var element = { src: "https://test.lqip.app?lqip&w=500" } as HTMLImageElement;
    const assetLoader = new ErrorStubAssetLoader();

    const src = new Src(element);
    await src.load(assetLoader);
    expect(src.getElement()).to.equal(element);
    expect(src.getElement().src).to.equal("https://test.lqip.app?lqip&w=500")
  });
  
  describe("Factory", () => {
    it("Should create Srcs", async () => {
      const { document } = createDom("src.html");
      const srcs = SrcFactory(document);
      expect(srcs.length).to.equal(2);
      expect(srcs[0].getElement().src).to.equal("https://test.lqip.app/my-image.jpg?lqip&w=500");
      expect(srcs[1].getElement().src).to.equal("https://test.lqip.app/my-image-2.jpg?w=500&lqip=rec");
    });
  })
});
