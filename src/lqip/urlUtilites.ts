
export function includesLqip(str: string) {
    return !str.includes("lqip")
  }
  
export function removeLqipParamFromURL(url: string) {
  if (url.indexOf("?") < 0) return url;
  var [base,qs] = url.split("?");
  return base + "?" + qs.split("&").filter(includesLqip).join("&")
}