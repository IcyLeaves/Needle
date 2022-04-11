function crazyOnClick(e, context) {
  e.srcElement.classList.add("crazy");
  e.srcElement.onclick = null;

  if (context.isLastDark == true) {
    context.chances = 0;
  }

  context.isLastDark = true; //[疯子]
}
export { crazyOnClick };
