function targetOnClick(e, boxes) {
  e.srcElement.classList.add("target");
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].onclick = null;
  }
}
export { targetOnClick };
