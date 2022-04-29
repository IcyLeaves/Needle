async function detectiveOnClick(e, context, i, j) {
  e.srcElement.classList.add("detective");
  context.boxArray[i][j].infos["detective"] = true;

  await context.animateChances(2);
}
export { detectiveOnClick };
