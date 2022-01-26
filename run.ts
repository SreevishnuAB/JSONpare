import { compareObjects } from './modules/compare.ts';
import { readFromFile, writeToFile } from './modules/utils.ts';

// console.log("Args:", Deno.args);

const file1 = Deno.args[0];
const file2 = Deno.args[1];
const keyIdx = Deno.args.findIndex(arg => arg.toLowerCase() === "-k");
if(keyIdx === -1)
  throw "Missing flag '-k': Key not specified";
const key = Deno.args[keyIdx + 1];
const outputIdx = Deno.args.findIndex(arg => arg.toLowerCase() === "-o");

const fileContent1 = await readFromFile(file1);
const fileContent2 = await readFromFile(file2);

const extractedObjs = compareObjects(key, fileContent1, fileContent2)

if(outputIdx !== -1){
  const outputFile = Deno.args[outputIdx + 1];
  console.log("Found output '-o' flag. Output file:", outputFile);
  await writeToFile(outputFile, extractedObjs);
}
