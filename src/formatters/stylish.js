const indentSize = 4;

const getIndent = (depth, offset = 0) => {
  return " ".repeat(depth * indentSize - offset);
};

const stringify = (value, depth) => {
  if (value === null) {
    return "null";
  }

  if (typeof value !== "object") {
    return String(value);
  }

  const indent = getIndent(depth);
  const closingIndent = getIndent(depth - 1);

  const lines = Object.entries(value).map(([key, val]) => {
    return `${indent}${key}: ${stringify(val, depth + 1)}`;
  });

  return `{\n${lines.join("\n")}\n${closingIndent}}`;
};

const stylish = (tree) => {
  const iter = (nodes, depth) => {
    const indent = getIndent(depth, 2);
    const closingIndent = getIndent(depth);

    const lines = nodes.flatMap((node) => {
      const { key, type } = node;

      if (type === "nested") {
        return `${indent}  ${key}: {\n${iter(node.children, depth + 1)}\n${closingIndent}}`;
      }

      if (type === "added") {
        return `${indent}+ ${key}: ${stringify(node.value, depth + 1)}`;
      }

      if (type === "removed") {
        return `${indent}- ${key}: ${stringify(node.value, depth + 1)}`;
      }

      if (type === "changed") {
        return [
          `${indent}- ${key}: ${stringify(node.oldValue, depth + 1)}`,
          `${indent}+ ${key}: ${stringify(node.newValue, depth + 1)}`,
        ];
      }

      return `${indent}  ${key}: ${stringify(node.value, depth + 1)}`;
    });

    return lines.join("\n");
  };

  return `{\n${iter(tree, 1)}\n}`;
};

export default stylish;
