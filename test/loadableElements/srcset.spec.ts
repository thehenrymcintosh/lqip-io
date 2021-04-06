import {SrcSet, SrcSetFactory} from "../../src/lqip/loadableElements/SrcSet";
import {expect} from "chai";
import { describe, it } from "mocha";
import {SuccessStubAssetLoader, DummyStubAssetLoader }from "../assetLoader";
import createDom from "../dom";

describe("SrcSet", () => {
  it("Should load Srcset string correctly", async () => {
    var element = { srcset: "https://test.lqip.app?lqip&w=500 500w, https://test.lqip.app?lqip&w=700 700w" } as HTMLImageElement;
    const assetLoader = new SuccessStubAssetLoader();
    const srcset = new SrcSet(element);
    await srcset.load(assetLoader);
    expect(srcset.getElement()).to.equal(element);
    expect(srcset.getElement().srcset).to.equal("https://test.lqip.app?w=500 500w, https://test.lqip.app?w=700 700w")
  });

  it("Does not use asset loader ", async () => {
    var element = { srcset: "https://test.lqip.app?lqip&w=500 500w, https://test.lqip.app?lqip&w=700 700w" } as HTMLImageElement;
    const assetLoader = new DummyStubAssetLoader();
    const srcset = new SrcSet(element);
    await srcset.load(assetLoader);
    expect(srcset.getElement()).to.equal(element);
    expect(srcset.getElement().srcset).to.equal("https://test.lqip.app?w=500 500w, https://test.lqip.app?w=700 700w")
  });
  
  describe("Factory", () => {
    it("Should create Srcs", async () => {
      const { document } = createDom("srcset.html");
      const srcsets = SrcSetFactory(document);
      expect(srcsets.length).to.equal(1);
      expect(srcsets[0].getElement().srcset).to.equal(
        "https://test.lqip.app/my-image.jpg?lqip&w=500 500w, " +
        "https://test.lqip.app/my-image.jpg?lqip&w=700 700w, " +
        "https://test.lqip.app/my-image.jpg?lqip&w=900 900w"
      );
    });
  });
})