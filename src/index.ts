import LqipLoader from "./lqip/lqipLoader";
const loader = new LqipLoader(document);


document.addEventListener("DOMContentLoaded", function() {
  loader.init();
});
if ( document.readyState !== "loading" ) {
  loader.init();
}