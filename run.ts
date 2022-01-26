console.log("Args:", Deno.args);

const file1 = Deno.args[0];
const file2 = Deno.args[1];
const optionIdx = Deno.args.findIndex(arg => arg.toLowerCase() === "-o"); // since there is only 1 optional fucntionality at the moment
const option = Deno.args[optionIdx];
const outputFile = Deno.args[optionIdx + 1];
