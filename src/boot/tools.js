export const has = function(obj, key) {
  return key.split(".").every(function(x) {
    if (typeof obj != "object" || obj === null || !x in obj) return false;
    obj = obj[x];
    return true;
  });
};
