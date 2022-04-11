function targetOnClick(e, context) {
  e.srcElement.classList.add("target");
  e.srcElement.onclick = null;

  for (var i = 0; i < context.boxArray.length; i++) {
    for (var j = 0; j < context.boxArray[i].length; j++) {
      context.boxArray[i][j].onclick = null;
    }
  }

  context.isLastDark = false; //[疯子]
}
export { targetOnClick };
