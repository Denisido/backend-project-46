
import fs from 'node:fs';
import path from 'node:path';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const path1 = path.resolve(filepath1);
  const path2 = path.resolve(filepath2);

  const data1 = fs.readFileSync(path1, 'utf-8');
  const data2 = fs.readFileSync(path2, 'utf-8');

  const format1 = path.extname(path1).slice(1);
  const format2 = path.extname(path2).slice(1);

  const result1 = parse(data1, format1);
  const result2 = parse(data2, format2);

  return '';
};

export default genDiff;
