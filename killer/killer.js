function killerOnClick(e, context, i, j) {
  context.killers.push(context.boxArray[i][j]);
  context.boxArray[i][j].killerTimer = 3;
  context.boxArray[i][j].signs[`killing3`] = true;
  context.boxArray[i][j].infos[`killer-notes3`] = true;
}
function killerCountDown(context) {
  for (var idx = 0; idx < context.killers.length; ) {
    let curr = context.killers[idx];
    delete curr.signs[`killing${curr.killerTimer}`];
    delete curr.infos[`killer-notes${curr.killerTimer}`];
    curr.killerTimer--;
    if (curr.killerTimer < 0) {
      context.killers.splice(idx, 1);
    } else {
      curr.signs[`killing${curr.killerTimer}`] = true;
      curr.infos[`killer-notes${curr.killerTimer}`] = true;
      context.refreshSigns(curr.i, curr.j);
      idx++;
    }
  }
}
export { killerOnClick, killerCountDown };
