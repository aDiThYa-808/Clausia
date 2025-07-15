"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

import {
  stepOneSchema,
  stepTwoSchema,
  fullSchema,
  FullFormData,
} from "@/lib/zodSchemas";
import StepThree from "./StepThree";
import StepFour from "./StepFour";

export default function FormWizard() {
  const [step, setStep] = useState(1);

  const methods = useForm<FullFormData>({
    resolver: zodResolver(fullSchema),
    mode: "onTouched",
    defaultValues: {
      productType: undefined,
      productName: "",
      productDescription: "",
      ageGroup:undefined,
      contactEmail: "",
      collectsData: undefined,
      collectedDataTypes: [],
      dataCollectionMethods: [],
      usesSDKs: undefined,
      thirdPartySDKs: [],
      otherthirdPartySDKs:"",
      dataStorageRegion: "",
      supportsDeletion: undefined,
      contactMethods: [],
      otherContactMethod: "",
    },
  });

  const {
    trigger,
    getValues,
    handleSubmit,
    formState: { errors },
  } = methods;

  const validateStep = async () => {
    if (step === 1)
      return await trigger(["productType","productName", "productDescription","ageGroup","contactEmail"]);
    if (step === 2)
      return await trigger([
        "collectsData",
        "collectedDataTypes",
        "dataCollectionMethods",
      ]);
    if (step === 3)
      return await trigger(["usesSDKs", "thirdPartySDKs", "dataStorageRegion"]);
    if (step === 4)
      return await trigger([
        "supportsDeletion",
        "contactMethods",
        "otherContactMethod",
      ]);
    return false;
  };

  const handleNext = async () => {
    const valid = await validateStep();
    if (valid) setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const onFinalSubmit = (data: FullFormData) => {
    console.log("✅ Final Submission:", data);
    // TODO: Send to API or move to Step 3
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onFinalSubmit)} className="space-y-6">
        {step === 1 && <StepOne />}
        {step === 2 && <StepTwo />}
        {step === 3 && <StepThree />}
        {step === 4 && <StepFour />}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              Back
            </button>
          )}

          {step < 4 && (
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Next
            </button>
          )}

          {step === 4 && (
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
