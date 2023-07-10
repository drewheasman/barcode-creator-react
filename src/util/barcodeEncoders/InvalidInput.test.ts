import { invalidInput, invalidNumericInput } from "./InvalidInput";

test("Invalid input", () => {
  expect(invalidInput("0123456789", "0-9")).toBe(false);
  expect(invalidInput("0123456789abc", "0-9")).toBe(true);
  expect(
    invalidInput(
      "0123456789abc",
      "0-9A-Za-z !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
    )
  ).toBe(false);
  expect(
    invalidInput(
      "0123456789abc¬",
      "0-9A-Za-z !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
    )
  ).toBe(true);
});

test("Invalid numeric input", () => {
  expect(invalidNumericInput("0123456789")).toBe(false);
  expect(invalidNumericInput("0123456789ABCabc!")).toBe(true);
  expect(invalidNumericInput("ABCabc!")).toBe(true);
});
