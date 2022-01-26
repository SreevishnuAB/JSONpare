import { compareObjects } from './modules/compare.ts';
import { readFromFile, writeToFile, filterObjects } from './modules/utils.ts';

// console.log("Args:", Deno.args);

const file1 = Deno.args[0];
const file2 = Deno.args[1];
const keyIdx = Deno.args.findIndex(arg => arg.toLowerCase() === "-k" || arg.toLowerCase() === "-kf");
if(keyIdx === -1)
  throw "Missing flags '-k' and '-kf: Key not specified";
const key = Deno.args[keyIdx + 1];
const outputIdx = Deno.args.findIndex(arg => arg.toLowerCase() === "-o");
let filterIdx = Deno.args.findIndex(arg => arg.toLowerCase() === "-f");
const iskeyFilter = Deno.args.includes("-kf"); //filter by key. Shortcut for -k key -f key

if(iskeyFilter)
  filterIdx = keyIdx;

const verbose = Deno.args.includes("-v") || Deno.args.includes("-V");

const fileContent1 = await readFromFile(file1, verbose);
const fileContent2 = await readFromFile(file2, verbose);

let extractedObjs = compareObjects(key, fileContent1, fileContent2, verbose);

if(filterIdx !== -1){
  const filterKeys = Deno.args[filterIdx + 1];
  const filterKeysArr = filterKeys.split(',');
  const filteredObjs = filterObjects(filterKeysArr, extractedObjs);
  if(verbose)
    console.log("Filtered objects with keys", filterKeysArr, ":", filteredObjs);
  extractedObjs = filteredObjs;
}

if(outputIdx !== -1){
  const outputFile = Deno.args[outputIdx + 1];
  console.log("Found '-o' flag. Output file:", outputFile);
  await writeToFile(outputFile, extractedObjs);
}
