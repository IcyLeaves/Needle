function targetOnClick(e, boxes) {
  e.srcElement.classList.add("target");
  for (var i = 0; i < boxes.length; i++) {
    for (var j = 0; j < boxes[i].length; j++) {
      boxes[i][j].onclick = null;
    }
  }
}
export { targetOnClick };
