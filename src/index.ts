import LqipLoader from "./lqip/lqipLoader";
const loader = new LqipLoader(document);

function onScroll() {
  loader.load();
}

document.addEventListener("DOMContentLoaded", function() {
  window.addEventListener('scroll', onScroll, {passive: true});
  loader.load();
});