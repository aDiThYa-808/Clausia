import { z } from "zod";

export const PrivacyPolicySchema = z.object({
  productName: z.string(),
  lastUpdated: z.string(),
  introduction: z.string(),
  sections: z.array(
    z.object({
      title: z.string(),
      content: z.string(),
    })
  ),
});