

export const getUnique = <T extends (string | number | symbol) >(array: (T)[]) => {
  const hash: {[prop: (string | number | symbol)]: any} = {};
  return array.filter(element => {
    if (element in hash) {
      return false;
    } else {
      hash[element] = true;
      return true;
    }
  });
};

export const sorter = (a: any, b: any, descending: boolean = false) => {
  if (descending) [a, b] = [b, a]
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}