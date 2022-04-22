function getObj(name) {
  var str = localStorage.getItem(name);
  if (str === "" || str === "{}" || !str) return {};
  return JSON.parse(str);
}
function setObj(name, obj) {
  localStorage.setItem(name, JSON.stringify(obj));
}
export { getObj, setObj };
