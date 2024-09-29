import { randomBytes } from "crypto";

export const generatePassword = (
  length: number,
  charsSets: string[]
): string => {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

  const allCharacters = ""
    .concat(charsSets.includes("uppercase") ? uppercase : "")
    .concat(charsSets.includes("lowercase") ? lowercase : "")
    .concat(charsSets.includes("numbers") ? numbers : "")
    .concat(charsSets.includes("symbols") ? symbols : "");
  let password = "";

  const randomValues = randomBytes(length);

  for (let i = 0; i < length; i++) {
    const randomIndex = randomValues[i] % allCharacters.length;
    password += allCharacters[randomIndex];
  }

  return password;
};
