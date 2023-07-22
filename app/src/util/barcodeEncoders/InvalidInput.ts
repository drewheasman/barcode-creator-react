export function invalidInput(input: string, validCharSet: string) {
  const invalidCharacters = new RegExp(`[^${validCharSet}]`);
  return invalidCharacters.test(input);
}

export function invalidNumericInput(input: string) {
  return invalidInput(input, "0-9");
}
