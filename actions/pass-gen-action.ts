"use server";

import { PassGenType } from "@/schemas";

import { generatePassword } from "../lib/generated-password";

export const passGenAction = async (data: PassGenType) => {
  const { length, charset } = data;
  const password = generatePassword(length, charset);

  return password;
};
