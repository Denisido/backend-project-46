import fs from "node:fs";
import path from "node:path";
import parse from "./parsers.js";
import buildTree from "./buildTree.js";
import stylish from "./formatters/stylish.js";

const genDiff = (filepath1, filepath2, format = "stylish") => {
  const path1 = path.resolve(filepath1);
  const path2 = path.resolve(filepath2);

  const data1 = fs.readFileSync(path1, "utf-8");
  const data2 = fs.readFileSync(path2, "utf-8");

  const obj1 = parse(data1, path.extname(path1).slice(1));
  const obj2 = parse(data2, path.extname(path2).slice(1));

  const tree = buildTree(obj1, obj2);

  if (format === "stylish") {
    return stylish(tree);
  }

  throw new Error(`Unknown format: ${format}`);
};

export default genDiff;
