function detectiveOnClick(e, context, i, j) {
  e.srcElement.classList.add("detective");
  context.boxArray[i][j].infos["detective"] = true;

  context.chances += 2;
}
export { detectiveOnClick };
