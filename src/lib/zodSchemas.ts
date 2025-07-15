import { z } from "zod";

export const stepOneSchema = z.object({
  productType: z.enum(['app', 'game', 'website'], {
    message: 'Please select if this is an app, game, or website.',
  }),
  productName: z.string().min(1, "App name is required"),
  productDescription: z.string().min(1, "Description is required"),
  ageGroup: z.enum(['under13', '13to17', '18plus', 'all', 'unsure'], {
    message: 'Please specify your app’s target age group',
  }),
  contactEmail: z.string().email("Must be a valid email"),
});

export const stepTwoSchema = z.object({
  collectsData: z.enum(['yes', 'no'], {
    message: 'Please indicate whether your app collects user data',
  }),
  collectedDataTypes: z.array(z.string()),
  dataCollectionMethods: z.array(z.string()),
}).superRefine((data, ctx) => {
  if (data.collectsData === 'yes') {
    if (!data.collectedDataTypes || data.collectedDataTypes.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['collectedDataTypes'],
        message: 'Select at least one data type or choose "Not sure"',
      });
    }

    if (!data.dataCollectionMethods || data.dataCollectionMethods.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['dataCollectionMethods'],
        message: 'Select at least one method or choose "Not sure"',
      });
    }
  }
});

export const stepThreeSchema = z.object({
  usesSDKs: z.enum(['yes', 'no'], {
    message: 'Please indicate if your app uses third-party SDKs',
  }),
  thirdPartySDKs: z.array(z.string()),
  dataStorageRegion: z.string().min(1, 'Please select a data storage location'),
  otherthirdPartySDKs: z.string().optional(), 
}).superRefine((data, ctx) => {
  if (data.usesSDKs === 'yes' && data.thirdPartySDKs.length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['thirdPartySDKs'],
      message: 'Select at least one SDK or choose "Not sure"',
    });
  }

  if (
    data.thirdPartySDKs.includes("Other") &&
    (!data.otherthirdPartySDKs || data.otherthirdPartySDKs.trim() === "")
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['otherthirdPartySDKs'],
      message: 'Please specify the SDK when selecting "Other"',
    });
  }
});

  export const stepFourSchema = z
  .object({
    supportsDeletion: z.enum(['yes', 'no']),
    contactMethods: z.array(z.string()),
    otherContactMethod: z.string().optional(),
  })
  .refine(
    (data) =>
      data.contactMethods.length > 0 ||
      (data.otherContactMethod && data.otherContactMethod.trim().length > 0),
    {
      path: ['contactMethods'],
      message: 'Please select at least one contact method',
    }
  );

export const fullSchema = stepOneSchema
  .merge(stepTwoSchema)
  .merge(stepThreeSchema)
  .merge(stepFourSchema);


export type StepOneData = z.infer<typeof stepOneSchema>;
export type StepTwoData = z.infer<typeof stepTwoSchema>;
export type StepThreeData = z.infer<typeof stepThreeSchema>;
export type FullFormData = z.infer<typeof fullSchema>;