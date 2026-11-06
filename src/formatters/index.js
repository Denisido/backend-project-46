import stylish from "./stylish.js";
import plain from "./plain.js";

const format = (tree, formatName = "stylish") => {
  if (formatName === "stylish") {
    return stylish(tree);
  }

  if (formatName === "plain") {
    return plain(tree);
  }

  throw new Error(`Unknown format: ${formatName}`);
};

export default format;
