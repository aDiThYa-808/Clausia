"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Toaster,toast } from "sonner";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

import {
  fullSchema,
  FullFormData,
} from "@/lib/validation/formSchemas";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import { useRouter } from "next/navigation";

export default function FormWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

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
    handleSubmit,
    formState: {},
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
    //console.log("Final Submission Data:", data)

    try {
      setLoading(true);
      const res = await fetch("/api/generate-policy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorText = await res.text();
        toast.error("Server Error", {description:
          errorText
        })
        //console.error("Server Error:", errorText);
        setLoading(false);
        return;
      }

      const { id } = await res.json();

      router.push(`/privacypolicy/preview/${id}`);
    } catch (err) {
      toast.error("Network Error")
      console.error(err);
    }
  };

  const steps = [
    { id: 1, label: "About Your Product" },
    { id: 2, label: "Data You Collect" },
    { id: 3, label: "Third-Party Tools" },
    { id: 4, label: "Contact Details" },
    { id: 5, label: "Monetization Details" },
  ];

  const messages = [
    "Summoning your clauses...",
    "Consulting the IT Act...",
    "Finalizing your policy draft...",
    "Formatting to perfection...",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [loading,messages.length]);

//conditional redendering the ui.
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-6 space-y-6">
        {/* Spinner with brand color */}
        <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />

        {/* Rotating fun message */}
        <h2 className="text-xl font-medium text-slate-800">
          {messages[messageIndex]}
        </h2>

        {/* Subtext */}
        <p className="text-slate-500 text-sm">
          Hang tight, this will not take long.
        </p>
      </div>
    );
  } else {
    return (
      <FormProvider {...methods}>
        <div className="space-y-12 max-w-3xl mx-auto">
          <Toaster richColors/>
          {/* Progress */}
          <div className="space-y-2 mb-8">
            <div className="flex justify-between text-sm font-medium text-slate-600">
              <span>
                Step {step} of {steps.length}
              </span>
              <span className=" text-slate-600">{steps[step - 1]?.label}</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
                style={{ width: `${(step / steps.length) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit(onFinalSubmit)} className="space-y-12">
            {step === 1 && <StepOne />}
            {step === 2 && <StepTwo />}
            {step === 3 && <StepThree />}
            {step === 4 && <StepFour />}
            {step === 5 && <StepFive />}

            <div className="flex justify-between items-center pt-6 border-t border-slate-200">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-sm text-slate-500 hover:text-slate-700 transition px-4 py-2"
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
                  className="bg-cyan-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-cyan-600 transition"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-green-700 transition"
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
}
