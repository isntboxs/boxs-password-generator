import * as z from "zod";

export const PassGenSchema = z.object({
  length: z.number().int(),
  charset: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "At least one character set must be selected",
  }),
  // excludeSimilarCharacters: z.boolean(),
  // excludeAmbiguousCharacters: z.boolean(),
  // strict: z.boolean(),
  // exclude: z.string().optional(),
});

export type PassGenType = z.infer<typeof PassGenSchema>;
