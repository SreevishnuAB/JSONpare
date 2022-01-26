function extractKeys(key: string, array: Record<string, unknown>[]): unknown[]{
  const keys: unknown[] = array.map((object: Record<string, unknown>)=> object[key]);
  return keys;
}

function subtractObjects(objs: Record<string, unknown>[], key: string, commonKeys: unknown[]): Record<string, unknown>[]{
  const trimmedObj = objs.filter(obj => !commonKeys.includes(obj[key]));
  return trimmedObj;
}

export function compareObjects(key: string, obj1: Record<string, unknown>[], obj2: Record<string, unknown>[]): Record<string, unknown>[]{

  const keysObj1 = extractKeys(key, obj1);
  const keysObj2 = extractKeys(key, obj2);

  const commonKeys: unknown[] = keysObj1.filter(key => keysObj2.includes(key));
  const selectedArr = (obj1.length > obj2.length)? obj1: obj2;
  const trimmedObj = subtractObjects(selectedArr, key, commonKeys);
  console.log("Trimmed object:", trimmedObj);
  return trimmedObj;
}