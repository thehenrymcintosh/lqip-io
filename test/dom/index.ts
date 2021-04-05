import { JSDOM } from "jsdom";
const fs = require("fs");
const path = require("path");

function createDom(stubName?: string) {
  var domStub;
  if (stubName) {
    domStub= fs.readFileSync(path.resolve(__dirname, 'stubs', stubName), 'utf8')
  }
  const dom = new JSDOM(domStub);
  const document = dom.window.document;
  const window = dom.window;
  return {
    document, 
    window,
  }
}

export default createDom;