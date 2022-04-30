function bangbangOnClick(e, context, i, j) {
  context.bangbangTimer = 3;
}
function bangbangCheck(context) {
  return context.bangbangTimer > 0;
}
function bangbangBanged(context, curr) {
  curr.signs["bangbang-sign"] = true;
  curr.infos["bangbang-info"] = true;

  context.bangbangTimer -= 1;
}
export { bangbangOnClick, bangbangCheck, bangbangBanged };
