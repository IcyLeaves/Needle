function jamOnClick(e, context, i, j) {
  e.srcElement.classList.add("jam");
  e.srcElement.onclick = null;
  // let i = e.srcElement.getAttribute("data-i");
  // let j = e.srcElement.getAttribute("data-j");
  context.boxArray[i][j].jamUnshow = false;

  context.isLastDark = true; //[疯子]
}
function jamCheck(e, boxArray, i, j) {
  let M = boxArray.length;
  let N = boxArray[0].length;
  if (i > 0 && boxArray[i - 1][j].jamUnshow) return true;
  if (i < M - 1 && boxArray[i + 1][j].jamUnshow) return true;
  if (j > 0 && boxArray[i][j - 1].jamUnshow) return true;
  if (j < N - 1 && boxArray[i][j + 1].jamUnshow) return true;
  return false;
}
export { jamOnClick, jamCheck };
