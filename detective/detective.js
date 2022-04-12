function detectiveOnClick(e, context, i, j) {
  e.srcElement.classList.add("detective");
  context.boxArray[i][j].infos["detective"] = true;

  context.chances += 2;

  context.isLastDark = false; //[疯子]
}
export { detectiveOnClick };
