import { accessSync, writeFileSync, readFileSync } from "fs";

const fileContent = readFileSync("./conditions.json", "utf-8");
const contentWithoutBOM = fileContent.replace(/^\uFEFF/, "");
let data = JSON.parse(contentWithoutBOM);
if (Array.isArray(data)) {
  for (const item of data) {
    item.languages = item.languages.filter((item, index, array) => item.lang_iso == "ru");
  }
}
writeFileSync("./conditionsOut.json", JSON.stringify(data, null, 2), "utf-8");
