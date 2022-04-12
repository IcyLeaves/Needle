function citizenOnClick(e, context, i, j) {
  e.srcElement.classList.add("citizen");
  context.boxArray[i][j].infos["citizen"] = true;

  context.isLastDark = false; //[疯子]
}
export { citizenOnClick };
