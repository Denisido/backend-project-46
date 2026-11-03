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
