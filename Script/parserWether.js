import { accessSync, constants, readFileSync } from "fs";

const fileContent = readFileSync("./conditions.json", "utf-8");
const contentWithoutBOM = fileContent.replace(/^\uFEFF/, "");
const data = JSON.parse(contentWithoutBOM);

if (Array.isArray(data)) {
  for (const item of data) {
    console.log(item);
  }
}
