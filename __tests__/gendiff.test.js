import { test, expect } from "vitest";
import path from "node:path";
import genDiff from "../src/index.js";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test("compare flat JSON files", () => {
  const filepath1 = path.resolve(__dirname, "../__fixtures__/file1.json");
  const filepath2 = path.resolve(__dirname, "../__fixtures__/file2.json");

  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(genDiff(filepath1, filepath2)).toBe(expected);
});

test("compare identical files", () => {
  const filepath = path.resolve(__dirname, "../__fixtures__/file1.json");

  const expected = `{
    follow: false
    host: hexlet.io
    proxy: 123.234.53.22
    timeout: 50
}`;

  expect(genDiff(filepath, filepath)).toBe(expected);
});

test("compare flat YAML files", () => {
  const filepath1 = path.resolve(__dirname, "../__fixtures__/file1.yml");
  const filepath2 = path.resolve(__dirname, "../__fixtures__/file2.yml");

  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(genDiff(filepath1, filepath2)).toBe(expected);
});

test("compare flat YAML files with .yaml extension", () => {
  const filepath1 = path.resolve(__dirname, "../__fixtures__/file1.yaml");
  const filepath2 = path.resolve(__dirname, "../__fixtures__/file2.yaml");

  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(genDiff(filepath1, filepath2)).toBe(expected);
});

test("compare nested JSON files", () => {
  const filepath1 = path.resolve(__dirname, "../__fixtures__/file1-nested.json");
  const filepath2 = path.resolve(__dirname, "../__fixtures__/file2-nested.json");

  const expected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

  expect(genDiff(filepath1, filepath2)).toBe(expected);
});

test("compare nested YAML files", () => {
  const json1 = path.resolve(__dirname, "../__fixtures__/file1-nested.json");
  const json2 = path.resolve(__dirname, "../__fixtures__/file2-nested.json");

  const yaml1 = path.resolve(__dirname, "../__fixtures__/file1-nested.yml");
  const yaml2 = path.resolve(__dirname, "../__fixtures__/file2-nested.yml");

  expect(genDiff(yaml1, yaml2)).toBe(genDiff(json1, json2));
});
