import {BackgroundImage, BackgroundImageFactory} from "../../src/lqip/loadableElements/BackgroundImage";
import {expect} from "chai";
import { describe, it } from "mocha";
import {ErrorStubAssetLoader, SuccessStubAssetLoader }from "../assetLoader";
import createDom from "../dom";

describe("Background Image", () => {
  it("Should load bg image correctly", async () => {
    var element = { style: { backgroundImage: `url("https://test.lqip.app?lqip&w=500")` } } as HTMLElement;
    const assetLoader = new SuccessStubAssetLoader();

    const src = new BackgroundImage(element);
    await src.load(assetLoader);
    expect(src.getElement()).to.equal(element);
    expect(src.getElement().style.backgroundImage).to.equal(`url("https://test.lqip.app?w=500")`)
  });

  it("Should not update bg image if can't load new src", async () => {
    var element = { style: { backgroundImage:  `url("https://test.lqip.app?lqip&w=500")` } } as HTMLElement;
    const assetLoader = new ErrorStubAssetLoader();

    const src = new BackgroundImage(element);
    await src.load(assetLoader);
    expect(src.getElement()).to.equal(element);
    expect(src.getElement().style.backgroundImage).to.equal(`url("https://test.lqip.app?lqip&w=500")`)
  });

  it("Should work with single quotes", async () => {
    var element = { style: { backgroundImage:  `url('https://test.lqip.app?lqip&w=500')` } } as HTMLElement;
    const assetLoader = new SuccessStubAssetLoader();

    const src = new BackgroundImage(element);
    await src.load(assetLoader);
    expect(src.getElement()).to.equal(element);
    expect(src.getElement().style.backgroundImage).to.equal(`url("https://test.lqip.app?w=500")`)
  });

  it("Should work with no quotes", async () => {
    var element = { style: { backgroundImage:  `url(https://test.lqip.app?lqip&w=500)` } } as HTMLElement;
    const assetLoader = new SuccessStubAssetLoader();

    const src = new BackgroundImage(element);
    await src.load(assetLoader);
    expect(src.getElement()).to.equal(element);
    expect(src.getElement().style.backgroundImage).to.equal(`url("https://test.lqip.app?w=500")`)
  });

  it("Should not update bg image if backgroundImage is mangled", async () => {
    var element = { style: {  } } as HTMLElement;
    const assetLoader = new ErrorStubAssetLoader();

    const src = new BackgroundImage(element);
    await src.load(assetLoader);
    expect(src.getElement()).to.equal(element);
  });

  describe("Factory", () => {
    it("Should create background images", async () => {
      const { document } = createDom("bg-img.html");
      const srcs = BackgroundImageFactory(document);
      expect(srcs.length).to.equal(2);
    });
  })
})
