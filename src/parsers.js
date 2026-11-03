import { load } from "js-yaml";

const parse = (data, format) => {
  if (format === "json") {
    return JSON.parse(data);
  }

  if (format === "yml" || format === "yaml") {
    return load(data);
  }
};

export default parse;
