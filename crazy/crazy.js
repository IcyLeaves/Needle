import { ACHIEVE } from "../_common/award.js";

function crazyOnClick(e, context, i, j) {
  e.srcElement.classList.add("crazy");
  context.boxArray[i][j].infos["crazy"] = true;

  if (context.isLastDark == true) {
    if (context.chances == 0) ACHIEVE.isAddChancesByCrazy = true;
    context.chances = 1;
  }

  context.isLastDark = true; //[疯子]
}
export { crazyOnClick };
