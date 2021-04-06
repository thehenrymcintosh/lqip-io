import {expect} from "chai";
import createDom from "./dom";
import LQIPLoader from "../src/lqip/LQIPLoader";
import InstantLoader from "./visibilityListener/instantListener";
import { SuccessStubAssetLoader } from "./assetLoader";

function runner(inputDomStubName?: string) {
  const {document} = createDom(inputDomStubName);
  const loader = new InstantLoader( document, new SuccessStubAssetLoader() );
  const lqip = new LQIPLoader(document, loader);
  lqip.init();
  return {document, lqip};
}

function isImage(node: HTMLElement | HTMLImageElement ): node is HTMLImageElement {
  return !!((node as HTMLImageElement).src || (node as HTMLImageElement).srcset);
}

function isElement(node: ChildNode): node is HTMLElement {
  return node.nodeType === node.ELEMENT_NODE;
}

function compareNodes(nodeA: HTMLElement | HTMLImageElement, nodeB: HTMLElement | HTMLImageElement) {
  if (isImage(nodeA) && isImage(nodeB)) {
    expect(nodeA.src).to.equal(nodeB.src);
    expect(nodeA.srcset).to.equal(nodeB.srcset);
  } else {
    expect(nodeA.style.backgroundImage).to.equal(nodeB.style.backgroundImage);
  }
}

function compareNodeLists(input: NodeListOf<ChildNode>, expected: NodeListOf<ChildNode>) {
  expect(input.length).to.equal(expected.length);
  input.forEach((node, i) => {
    const expectedNode = expected[i];
    expect(isElement(node)).to.equal(isElement(expectedNode));
    if ( isElement(node) && isElement(expectedNode) ) {
      compareNodes(node, expectedNode)
      if (node.hasChildNodes()) {
        compareNodeLists(node.childNodes, expectedNode.childNodes);
      }

    }
  })
}

describe("Lqip", () => {
  it("should accept dom as an argument", async () => {
    const {document: inputdocument, lqip} = runner("test-input.html");
    const {document} = createDom("test-output.html");
    // the instantly resolving promises in the LqipLoader test doubles need an opportunity to resolve
    await Promise.resolve(); 
    compareNodeLists(inputdocument.body.childNodes, document.body.childNodes);
  })
})