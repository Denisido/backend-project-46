
import fs from 'node:fs';
import path from 'node:path';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const path1 = path.resolve(filepath1);
  const path2 = path.resolve(filepath2);

  const data1 = fs.readFileSync(path1, 'utf-8');
  const data2 = fs.readFileSync(path2, 'utf-8');

  const obj1 = parse(data1, path.extname(path1).slice(1));
  const obj2 = parse(data2, path.extname(path2).slice(1));

  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort();

  const lines = keys.flatMap((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return [`  + ${key}: ${obj2[key]}`];
    }

    if (!Object.hasOwn(obj2, key)) {
      return [`  - ${key}: ${obj1[key]}`];
    }

    if (obj1[key] !== obj2[key]) {
      return [
        `  - ${key}: ${obj1[key]}`,
        `  + ${key}: ${obj2[key]}`,
      ];
    }

    return [`    ${key}: ${obj1[key]}`];
  });

  return `{\n${lines.join('\n')}\n}`;
};

export default genDiff;

