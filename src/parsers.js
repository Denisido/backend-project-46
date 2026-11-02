const parse = (data, format) => {
  if (format === "json") {
    return JSON.parse(data);
  }
};

export default parse;
