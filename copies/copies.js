import * as COMMON from "../_common/common.js";
function copiesOnClick(e, context, i, j) {
  var idx = context.copiesTeam.indexOf(COMMON.setPair(i, j));
  if (idx > -1) context.copiesTeam.splice(idx, 1);
}
function copiesCheck(context, i, j) {
  if (context.boxArray[i][j].roleid == 0 && context.copiesTeam.length > 0) {
    var pair = COMMON.withdraw(context.copiesTeam);
    //清除上次的标记
    var [currX, currY] = COMMON.getPair(context.copiesCurr);
    if (currX > -1) {
      var idx = context.boxArray[currX][currY].copiesDir;
      delete context.boxArray[currX][currY].infos[`copies-notes-${idx}`];
      delete context.boxArray[currX][currY].signs[`copies-signs-${idx}`];
    }
    //将标记打到现在这个位置
    context.copiesCurr = COMMON.setPair(i, j);
    //把目标送到安全的地方
    var [x, y] = COMMON.getPair(pair);
    var a = context.boxArray[i][j]; //原来目标的位置
    var b = context.boxArray[x][y]; //原来保镖的位置
    //身份下标需要交换
    [a.roleid, b.roleid] = [b.roleid, a.roleid];
    // //点击函数需要交换
    // [a.onclick, b.onclick] = [b.onclick, a.onclick];
    //打上标记
    var idx = getIdx(i, j, x, y);
    context.boxArray[i][j].copiesDir = idx;
    context.boxArray[i][j].infos[`copies-notes-${idx}`] = true;
    context.boxArray[i][j].signs[`copies-signs-${idx}`] = true;
    return true;
  }
  return false;
}
function getIdx(i, j, x, y) {
  var dx, dy;
  if (x < i) dx = 0;
  else if (x == i) dx = 1;
  else dx = 2;
  if (y < j) dy = 0;
  else if (y == j) dy = 1;
  else dy = 2;
  return dx * 3 + dy;
}
export { copiesOnClick, copiesCheck };
