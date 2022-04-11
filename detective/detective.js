function detectiveOnClick(e, context) {
  e.srcElement.classList.add("detective");
  e.srcElement.onclick = null;

  context.chances += 2;

  context.isLastDark = false; //[疯子]
}
export { detectiveOnClick };
