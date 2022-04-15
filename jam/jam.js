function jamOnClick(e, context, i, j) {
  e.srcElement.classList.add("jam");
  context.boxArray[i][j].infos["jam"] = true;

  // let i = e.srcElement.getAttribute("data-i");
  // let j = e.srcElement.getAttribute("data-j");

  context.isLastDark = true; //[疯子]
}
function jamCheck(context, curr) {
  let boxArray = context.boxArray;
  let M = boxArray.length;
  let N = boxArray[0].length;
  let i = curr.i;
  let j = curr.j;
  if (
    i > 0 &&
    boxArray[i - 1][j].roleid == 3 &&
    boxArray[i - 1][j].shown == false
  )
    return true;
  if (
    i < M - 1 &&
    boxArray[i + 1][j].roleid == 3 &&
    boxArray[i + 1][j].shown == false
  )
    return true;
  if (
    j > 0 &&
    boxArray[i][j - 1].roleid == 3 &&
    boxArray[i][j - 1].shown == false
  )
    return true;
  if (
    j < N - 1 &&
    boxArray[i][j + 1].roleid == 3 &&
    boxArray[i][j + 1].shown == false
  )
    return true;
  return false;
}
export { jamOnClick, jamCheck };
