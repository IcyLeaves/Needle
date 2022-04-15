function volunteerOnClick(e, context, i, j) {
  e.srcElement.classList.add("volunteer");
  context.boxArray[i][j].infos["volunteer"] = true;

  context.isLastDark = false; //[疯子]
}
function volunteerCheck(context, curr) {
  if (context.chances != 0) return;
  let boxArray = context.boxArray;
  let M = boxArray.length;
  let N = boxArray[0].length;
  let i = curr.i;
  let j = curr.j;
  if (
    i > 0 &&
    boxArray[i - 1][j].roleid == 8 &&
    boxArray[i - 1][j].shown == true
  )
    context.chances += 2;
  if (
    i < M - 1 &&
    boxArray[i + 1][j].roleid == 8 &&
    boxArray[i + 1][j].shown == true
  )
    context.chances += 2;
  if (
    j > 0 &&
    boxArray[i][j - 1].roleid == 8 &&
    boxArray[i][j - 1].shown == true
  )
    context.chances += 2;
  if (
    j < N - 1 &&
    boxArray[i][j + 1].roleid == 8 &&
    boxArray[i][j + 1].shown == true
  )
    context.chances += 2;
}
export { volunteerOnClick, volunteerCheck };
