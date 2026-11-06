const stringify = (value) => {
  if (typeof value === "object" && value !== null) {
    return "[complex value]";
  }

  if (typeof value === "string") {
    return `'${value}'`;
  }

  return String(value);
};

const getPath = (parent, key) => {
  return parent ? `${parent}.${key}` : key;
};

const plain = (tree) => {
  const iter = (nodes, parent = "") => {
    return nodes.flatMap((node) => {
      const { key, type } = node;
      const currentPath = getPath(parent, key);

      if (type === "nested") {
        return iter(node.children, currentPath);
      }

      if (type === "added") {
        return `Property '${currentPath}' was added with value: ${stringify(node.value)}`;
      }

      if (type === "removed") {
        return `Property '${currentPath}' was removed`;
      }

      if (type === "changed") {
        return `Property '${currentPath}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
      }

      return [];
    });
  };

  return iter(tree).join("\n");
};

export default plain;
