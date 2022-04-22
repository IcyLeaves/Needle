import * as COMMON from "../_common/common.js";
import { copiesCheck } from "../copies/copies.js";
function targetOnClick(e, context, i, j) {
  //[替身]
  if (copiesCheck(context, i, j)) {
    context.chances++;
    context.step(e, context, i, j);
    return;
  }

  e.srcElement.classList.add("target");
  context.boxArray[i][j].infos["target"] = true;

  for (var m = 0; m < context.boxArray.length; m++) {
    for (var n = 0; n < context.boxArray[i].length; n++) {
      context.boxArray[m][n].onclick = null;
    }
  }
  context.isGameOver = 1;
  if (context.killers.length > 0) {
    context.boxArray[i][j].signs["killed"] = true;
    context.boxArray[i][j].infos["killed-notes"] = true;

    context.isGameOver = 0;
  }
  context.isLastDark = false; //[疯子]
}
export { targetOnClick };
