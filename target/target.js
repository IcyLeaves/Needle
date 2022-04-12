function targetOnClick(e, context, i, j) {
  e.srcElement.classList.add("target");
  context.boxArray[i][j].infos["target"] = true;

  for (var i = 0; i < context.boxArray.length; i++) {
    for (var j = 0; j < context.boxArray[i].length; j++) {
      context.boxArray[i][j].onclick = null;
    }
  }

  context.isLastDark = false; //[疯子]
}
export { targetOnClick };
