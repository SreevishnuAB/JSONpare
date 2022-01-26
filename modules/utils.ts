export async function readFromFile(filePath: string): Promise<Record<string,unknown>[]>{
  try {
    const fileContent = await Deno.readTextFile(filePath);
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