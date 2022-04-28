function citizenOnClick(e, context, i, j) {
  e.srcElement.classList.add("citizen");
  context.boxArray[i][j].infos["citizen"] = true;
}
export { citizenOnClick };
