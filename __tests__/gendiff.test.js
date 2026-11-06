import { test, expect } from "vitest";
import path from "node:path";
import genDiff from "../src/index.js";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test("compare identical files", () => {
  const filepath = path.resolve(__dirname, "../__fixtures__/file1-nested.json");

  const result = genDiff(filepath, filepath, "plain");

  expect(result).toBe("");
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

test("compare nested JSON files with plain format", () => {
  const filepath1 = path.resolve(__dirname, "../__fixtures__/file1-nested.json");
  const filepath2 = path.resolve(__dirname, "../__fixtures__/file2-nested.json");

  const expected = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

  expect(genDiff(filepath1, filepath2, "plain")).toBe(expected);
});

test("compare nested JSON files with json format", () => {
  const filepath1 = path.resolve(__dirname, "../__fixtures__/file1-nested.json");
  const filepath2 = path.resolve(__dirname, "../__fixtures__/file2-nested.json");

  const result = genDiff(filepath1, filepath2, "json");

  const parsed = JSON.parse(result);

  expect(Array.isArray(parsed)).toBe(true);
  expect(parsed[0].key).toBe("common");
  expect(parsed[0].type).toBe("nested");
  expect(Array.isArray(parsed[0].children)).toBe(true);
});

test("compare nested YAML files with .yaml extension", () => {
  const filepath1 = path.resolve(__dirname, "../__fixtures__/file1-nested.yaml");
  const filepath2 = path.resolve(__dirname, "../__fixtures__/file2-nested.yaml");

  const json1 = path.resolve(__dirname, "../__fixtures__/file1-nested.json");
  const json2 = path.resolve(__dirname, "../__fixtures__/file2-nested.json");

  expect(genDiff(filepath1, filepath2)).toBe(genDiff(json1, json2));
});
