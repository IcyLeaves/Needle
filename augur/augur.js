import * as COMMON from "../_common/common.js";
function augurOnClick(e, context, i, j) {
  e.srcElement.classList.add("augur");
  context.boxArray[i][j].infos["augur"] = true;

  if (context.augurDecks.length > 0) {
    var i = Math.floor(Math.random() * context.augurDecks.length);
    var n = context.augurDecks.length;
    COMMON.swap(context.augurDecks, i, n - 1);
    var [x, y] = COMMON.getPair(context.augurDecks.pop());
    var remove = function (arr, val) {
      var index = arr.indexOf(val);
      if (index > -1) {
        arr.splice(index, 1);
      }
    };
    for (var dx = -1; dx <= 1; dx++) {
      for (var dy = -1; dy <= 1; dy++) {
        remove(context.augurDecks, COMMON.setPair(x + dx, y + dy));
      }
    }
    for (var dx = 0; dx <= 1; dx++) {
      for (var dy = 0; dy <= 1; dy++) {
        var nx = x + dx;
        var ny = y + dy;
        remove(context.augurDecks, COMMON.setPair(nx, ny));
        if (context.SUNS.indexOf(context.boxArray[nx][ny].roleid) > -1) {
          context.boxArray[nx][ny].infos["augur-sun-notes"] = true;
          context.boxArray[nx][ny].signs["augur-sun-signs"] = true;
        } else {
          context.boxArray[nx][ny].infos["augur-moon-notes"] = true;
          context.boxArray[nx][ny].signs["augur-moon-signs"] = true;
        }
      }
    }
  }

  context.isLastDark = false; //[疯子]
}

function augurInit(m, n) {
  var res = [];
  for (var i = 0; i < m - 1; i++) {
    for (var j = 0; j < n - 1; j++) {
      res.push(COMMON.setPair(i, j));
    }
  }
  return res;
}
// function augurClear(context, x, y) {
//   delete context.boxArray[x][y].infos["augur-sun-notes"];
//   delete context.boxArray[x][y].signs["augur-sun-signs"];
//   delete context.boxArray[x][y].infos["augur-moon-notes"];
//   delete context.boxArray[x][y].signs["augur-moon-signs"];
//   context.refreshSigns(x, y);
//   context.refreshInfos(x, y);
// }
export { augurOnClick, augurInit };
