/**
 * document is injected
 * register plugins
 * init (get list of elements to watch with callbacks)
 * 
 */
import {expect} from "chai";
import createDom from "./dom";
import LQIPLoader from "../src/lqip/LQIPLoader";

function runner(stubName?: string) {
  const {document} = createDom(stubName);
  return new LQIPLoader(document);
}

describe("Lqip", () => {
  it("should accept dom as an argument", () => {
    runner();
  })
})