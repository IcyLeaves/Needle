var d = [-1, 0, 1];
function sheriffOnClick(e, context, i, j) {
  e.srcElement.classList.add("sheriff");
  context.boxArray[i][j].infos["sheriff"] = true;

  var init = 8;
  var M = context.boxArray.length;
  var N = context.boxArray[0].length;
  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      if (x == 1 && y == 1) continue;
      var dx = d[x];
      var dy = d[y];
      if (i + dx < 0 || i + dx >= M || j + dy < 0 || j + dy >= N) {
        init--;
        continue;
      }
      if (context.boxArray[i + dx][j + dy].shown) {
        init--;
      }
    }
  }
  context.boxArray[i][j].sheriffRemain = init;
  if (init == 0) context.chances *= 2;

  context.isLastDark = false; //[疯子]
}
function sheriffCheck(context, i, j) {
  var M = context.boxArray.length;
  var N = context.boxArray[0].length;
  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      if (x == 1 && y == 1) continue;
      var dx = d[x];
      var dy = d[y];
      if (i + dx < 0 || i + dx >= M || j + dy < 0 || j + dy >= N) {
        continue;
      }
      context.boxArray[i + dx][j + dy].sheriffRemain--;
      if (
        context.boxArray[i + dx][j + dy].sheriffRemain == 0 &&
        context.boxArray[i + dx][j + dy].shown == true
      ) {
        context.chances *= 2;
      }
    }
  }
}
export { sheriffOnClick, sheriffCheck };
