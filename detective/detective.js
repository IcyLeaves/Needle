function detectiveOnClick(e, context) {
  e.srcElement.classList.add("detective");
  context.chances += 2;
  e.srcElement.onclick = null;
}
export { detectiveOnClick };
