function killerOnClick(e, context, i, j) {
  e.srcElement.classList.add("killer");
  context.boxArray[i][j].infos["killer"] = true;

  context.killerTimer = 3;

  context.isLastDark = true; //[疯子]
}
export { killerOnClick };
