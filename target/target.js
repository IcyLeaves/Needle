function targetOnClick(e, context) {
  e.srcElement.classList.add("target");
  for (var i = 0; i < context.boxArray.length; i++) {
    for (var j = 0; j < context.boxArray[i].length; j++) {
      context.boxArray[i][j].onclick = null;
    }
  }
  e.srcElement.onclick = null;
}
export { targetOnClick };
