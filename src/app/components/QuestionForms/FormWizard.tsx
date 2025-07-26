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
} from "@/lib/zod/formSchemas";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import { useRouter } from "next/navigation";

export default function FormWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const methods = useForm<FullFormData>({
    resolver: zodResolver(fullSchema),
    mode: "onTouched",
    defaultValues: {
      productType: "app",
      productName: "",
      productDescription: "",
      ageGroup: undefined,
      contactEmail: "",
      collectsData: undefined,
      collectedDataTypes: [],
      dataCollectionMethods: [],
      usesSDKs: undefined,
      thirdPartySDKs: [],
      otherthirdPartySDKs: "",
      dataStorageRegion: "",
      supportsDeletion: undefined,
      contactMethods: [],
      otherContactMethod: "",
      monetizationMethod: undefined,
      adPlatforms: [],
      adsArePersonalized: undefined,
      otherMonetizationExplanation: undefined,
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
      return await trigger([
        "productType",
        "productName",
        "productDescription",
        "ageGroup",
        "contactEmail",
      ]);
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

    if (step === 5)
      return await trigger([
        "monetizationMethod",
        "adPlatforms",
        "adsArePersonalized",
        "otherMonetizationExplanation",
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

  //called when generate policy is clicked
  const onFinalSubmit = async (data: FullFormData) => {
    console.log("✅ Final Submission Data:", data)
  
    try {
      const res = await fetch("/api/generate-policy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
  
      if (!res.ok) {
        const errorText = await res.text()
        console.error("❌ Server Error:", errorText)
        return
      }
  
      const { id } = await res.json()

      router.push(`/privacypolicy/${id}`)
  
    } catch (err) {
      console.error("❌ Network or Unexpected Error:", err)
    }
  }
  
  

  const steps = [
    { id: 1, label: "About Your Product" },
    { id: 2, label: "Data You Collect" },
    { id: 3, label: "Third-Party Tools" },
    { id: 4, label: "Contact Details" },
    { id: 5, label: "Monetization Details" },
  ];

  return (
    <FormProvider {...methods}>
      <div className="space-y-20">
        {/* Progress */}
        <div className="space-y-1 mb-12">
          <div className="flex justify-between text-xs font-medium text-slate-500">
            <span>
              Step {step} of {steps.length}
            </span>
            <span>{steps[step - 1]?.label}</span>
          </div>
          <div className="w-full bg-slate-200 h-1 rounded-full">
            <div
              className="h-1 bg-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${(step / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onFinalSubmit)} className="space-y-20">
          {step === 1 && <StepOne />}
          {step === 2 && <StepTwo />}
          {step === 3 && <StepThree />}
          {step === 4 && <StepFour />}
          {step === 5 && <StepFive />}

          <div className="flex justify-between items-center pt-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="text-sm text-slate-500 hover:text-slate-800 transition px-4 py-2"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            {step < steps.length ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-indigo-600 text-white text-sm px-5 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-600 text-white text-sm px-5 py-2 rounded-md hover:bg-green-700 transition"
              >
                Generate Policy
              </button>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
