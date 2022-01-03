

export const getUnique = <T extends (string | number | symbol) >(array: (T)[], ignoreNull: boolean = true) => {
  const hash: {[prop: (string | number | symbol)]: any} = {};
  return array.filter(element => {
    if (element in hash || (ignoreNull && (element === null || element === ''))) {
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
};

export const getRandom = (arr: any[]) => {
  if (arr.length === 0) return null;
  const randomIndex = Math.floor(arr.length * Math.random());
  return arr[randomIndex];
};