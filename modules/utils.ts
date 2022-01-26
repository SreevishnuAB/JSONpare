export async function readFromFile(filePath: string): Promise<Record<string,unknown>[]>{
  try {
    const fileContent = await Deno.readTextFile(filePath);
    console.log("Read file contents:", fileContent);
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Oops! Something went wrong:", error);
    throw error;
  }
}

export async function writeToFile(filePath: string, fileContent: Record<string, unknown>[]): Promise<void>{
  try {
    const stringifiedContent = JSON.stringify(fileContent);
    await Deno.writeTextFile(filePath, stringifiedContent);
  } catch (error) {
    console.error("Oops! Something went wrong:", error);
    throw error;
  }
}

export function filterObjects(keys: string[], objects: Record<string, unknown>[]): Record<string, unknown>[]{
  
  const filterObjectWithKeys = (keys: string[], object: Record<string, unknown>)=>{
    const newObj: Record<string, unknown> = {}
    for(const key of keys)
      newObj[key] = object[key];
    return newObj;
  }
  const filteredObjs = objects.map(obj => filterObjectWithKeys(keys, obj));
  return filteredObjs;
}