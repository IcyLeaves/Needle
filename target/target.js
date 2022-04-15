function targetOnClick(e, context, i, j) {
  e.srcElement.classList.add("target");
  context.boxArray[i][j].infos["target"] = true;

  for (var m = 0; m < context.boxArray.length; m++) {
    for (var n = 0; n < context.boxArray[i].length; n++) {
      context.boxArray[m][n].onclick = null;
    }
  }
  context.isGameOver = 1;
  if (context.killers.length > 0) {
    console.log(context.killers);
    context.boxArray[i][j].signs["killed"] = true;
    context.boxArray[i][j].infos["killed-notes"] = true;

    context.isGameOver = 0;
  }
  context.isLastDark = false; //[疯子]
}
export { targetOnClick };
