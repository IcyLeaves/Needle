function citizenOnClick(e, context) {
  e.srcElement.classList.add("citizen");
  e.srcElement.onclick = null;

  context.isLastDark = false; //[疯子]
}
export { citizenOnClick };
