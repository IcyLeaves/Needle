function citizenOnClick(e) {
  e.srcElement.classList.add("citizen");
  e.srcElement.onclick = null;
}
export { citizenOnClick };
