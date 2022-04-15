let swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};
function augurOnClick(e, context, i, j) {
  e.srcElement.classList.add("augur");
  context.boxArray[i][j].infos["augur"] = true;

  if (context.augurDecks.length > 0) {
    var i = Math.floor(Math.random() * context.augurDecks.length);
    var n = context.augurDecks.length;
    swap(context.augurDecks, i, n - 1);
    var xyPair = context.augurDecks.pop().split("-");
    var x = parseInt(xyPair[0]),
      y = parseInt(xyPair[1]);
    var remove = function (arr, val) {
      var index = arr.indexOf(val);
      if (index > -1) {
        arr.splice(index, 1);
      }
    };
    remove(context.augurDecks, `${x - 1}-${y}`);
    remove(context.augurDecks, `${x + 1}-${y}`);
    remove(context.augurDecks, `${x}-${y - 1}`);
    remove(context.augurDecks, `${x}-${y + 1}`);
    for (var dx = 0; dx < 2; dx++) {
      for (var dy = 0; dy < 2; dy++) {
        if (
          context.SUNS.indexOf(context.boxArray[x + dx][y + dy].roleid) > -1
        ) {
          context.boxArray[x + dx][y + dy].infos["augur-sun-notes"] = true;
          context.boxArray[x + dx][y + dy].signs["augur-sun-signs"] = true;
        } else {
          context.boxArray[x + dx][y + dy].infos["augur-moon-notes"] = true;
          context.boxArray[x + dx][y + dy].signs["augur-moon-signs"] = true;
        }
        context.refreshSigns(x + dx, y + dy);
        context.refreshInfos(x + dx, y + dy);
      }
    }
  }

  context.isLastDark = false; //[疯子]
}

function augurInit(m, n) {
  var res = [];
  for (var i = 0; i < m - 1; i++) {
    for (var j = 0; j < n - 1; j++) {
      res.push(`${i}-${j}`);
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
