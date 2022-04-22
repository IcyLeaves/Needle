function getObj(name) {
  var str = Cookies.get(name);
  if (str === "" || str === "{}" || !str) return {};
  return JSON.parse(str);
}
function setObj(name, obj) {
  Cookies.set(name, JSON.stringify(obj), { expires: 77777 });
}
export { getObj, setObj };
