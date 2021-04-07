import LqipLoader from "./lqip/lqipLoader";
const loader = new LqipLoader(document);


if ( document.readyState !== "loading" ) {
  loader.init();
} else {
  document.addEventListener("DOMContentLoaded", function() {
    loader.init();
  });
}