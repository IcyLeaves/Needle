import * as COMMON from "../_common/common.js";
function copiesOnClick(e, context, i, j) {
  e.srcElement.classList.add("copies");
  context.boxArray[i][j].infos["copies"] = true;

  context.isLastDark = true; //[疯子]
}
function copiesSwap(context, target) {
  var copiesTeam = context.copiesTeam;
}
export { copiesOnClick };
