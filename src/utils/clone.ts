export function deepCopy<T extends Array<T> | any>(sourceData: T): T {
  if (Array.isArray(sourceData)) {
    return sourceData.map(item => deepCopy(item)) as T;
  }
  const obj: T = {} as T;
  for (const key in sourceData) {
    if ((typeof sourceData[key] === 'object') && sourceData[key] !== null) {
      obj[key] = deepCopy(sourceData[key]);
    } else {
      obj[key] = sourceData[key];
    }
  }
  return obj;
}

// 获取对象的第一个元素
export function getFirst(obj: Record<string, unknown>) {
  for (const key in obj) {
    return obj[key];
  }
}

export default deepCopy;
