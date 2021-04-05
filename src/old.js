document.addEventListener("DOMContentLoaded", function() {
  
  function isInViewport(elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.bottom >= 0 &&
        bounding.left >= 0 &&
        bounding.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  function includesLqip(e) {
    return !e.includes("lqip")
  }

  function removeLqipParamFromURL(url) {
    if (url.indexOf("?") < 0) return e;
    var [base,qs] = e.split("?");
    return base + "?" + qs.split("&").filter(includesLqip).join("&")
  }

  var lqips = [];

  function setLqips() {
    var newlqips = [];
    document.querySelectorAll("img[src]")
      .forEach(function(element){
        if ( element.src.includes("?lqip") || element.src.includes("&lqip") ) {
          newlqips.push({type: "img", element});
        }
      });
    document.querySelectorAll("[style]")
      .forEach(function(element){
        if ( element.style.backgroundImage.includes("?lqip") || element.style.backgroundImage.includes("&lqip") ) {
          newlqips.push({type: "bg", element});
        }
      });
    document.querySelectorAll("[srcset]")
      .forEach(function(element) {
        if (e.srcset.includes("?lqip") || e.srcset.includes("&lqip")) { 
          newlqips.push({ type: "srcset", element });
        }
      });
    lqips = newlqips;
  }
  setLqips();

  function loadBg(lqip) {
    if (!lqip || !lqip.style || !lqip.style.backgroundImage || lqip.style.backgroundImage.split('"').length !== 3 ) {
      return;
    }
    var src = lqip.style.backgroundImage.split('"')[1];
    src = removeLqipParamFromURL(src);

    var loader = document.createElement("img");
    loader.src = src;
    loader.addEventListener('load',function(){
      loader.remove();
      lqip.style.backgroundImage = "url('" + src + "')";
      lqip.setAttribute("loaded","");
      setLqips();
    })
  }

  function loadImg(lqip) {
    var src = removeLqipParamFromURL(lqip.src);
    var loader = document.createElement("img");
    loader.src = src;
    loader.addEventListener('load',function(){
      loader.remove();
      lqip.src = src;
      lqip.setAttribute("loaded","");
      setLqips();
    })
  }

  function loadSrcset(lqip) {
    if ("srcset" === lqip.type) {
      var element = lqip.element;
      element.srcset = element.srcset.split(" ").map(removeLqipParamFromURL).join(" ");
    }
  }

  function load(lqipData) {
    if ( lqipData.type === "bg" ) {
      loadBg(lqipData.element);
    } else if ( lqipData.type === "img" ) {
      loadImg(lqipData.element);
    } else if (lqipData.type === "srcset" ) {
      loadSrcset(lqipData.element);
    }
  }

  function onScroll() {
    var lqip;
    var i;
    for ( i = 0; i < lqips.length; i++ ) {
      lqip = lqips[i];
      if (isInViewport(lqip.element) && !lqip.element.hasAttribute("loaded")) {
        load(lqip);
      }
    }
  }
  window.addEventListener('scroll', onScroll, {passive: true});
  onScroll();
});