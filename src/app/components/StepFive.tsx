"use client";

import { useFormContext, useWatch } from "react-hook-form";

export default function StepFive() {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const monetizationMethod = useWatch({ control, name: "monetizationMethod" }) || "";

  const showAdsFields = monetizationMethod === "ads";
  const showOtherField = monetizationMethod === "other";

  return (
    <div className="space-y-20">
      {/* Q1: Monetization method */}
      <div className="space-y-2">
        <h2 className="text-lg font-medium text-slate-800">
          How do you monetize this product?
        </h2>
        <div className="flex flex-col gap-2">
          {["none", "ads", "in-app-purchases", "other"].map((val) => (
            <label key={val} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                value={val}
                {...register("monetizationMethod", {
                  required: "Please select a monetization method.",
                })}
                className="accent-indigo-600"
              />
              {{
                none: "None",
                ads: "Ads",
                "in-app-purchases": "In-app purchases",
                other: "Other",
              }[val]}
            </label>
          ))}
        </div>
        {errors.monetizationMethod && (
          <p className="text-red-500 text-sm">
            {String(errors.monetizationMethod.message)}
          </p>
        )}
      </div>

      {/* Q2: Ad Platforms */}
      {showAdsFields && (
        <div className="space-y-2">
          <h2 className="text-lg font-medium text-slate-800">
            Which ad platforms do you use?
          </h2>
          <div className="grid grid-cols-2 gap-y-2 max-w-md">
            {["AdMob", "Unity Ads", "Facebook Audience Network"].map((sdk) => (
              <label key={sdk} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  value={sdk}
                  {...register("adPlatforms")}
                  className="accent-indigo-600"
                />
                {sdk}
              </label>
            ))}
          </div>
          {errors.adPlatforms && (
            <p className="text-red-500 text-sm">
              {String(errors.adPlatforms.message)}
            </p>
          )}
        </div>
      )}

      {/* Q3: Ads Personalized? */}
      {showAdsFields && (
        <div className="space-y-2">
          <h2 className="text-lg font-medium text-slate-800">
            Are the ads personalized or contextual?
          </h2>
          <div className="flex flex-col gap-2">
            {["personalized", "contextual", "not_sure"].map((type) => (
              <label key={type} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  value={type}
                  {...register("adsArePersonalized")}
                  className="accent-indigo-600"
                />
                {{
                  personalized: "Personalized",
                  contextual: "Contextual only",
                  not_sure: "Not sure",
                }[type]}
              </label>
            ))}
          </div>
          {errors.adsArePersonalized && (
            <p className="text-red-500 text-sm">
              {String(errors.adsArePersonalized.message)}
            </p>
          )}
        </div>
      )}

      {/* Q4: Other Monetization Explanation */}
      {showOtherField && (
        <div className="space-y-2">
          <h2 className="text-lg font-medium text-slate-800">
            Please describe your monetization method.
          </h2>
          <input
            type="text"
            placeholder="e.g., Paid app with email-based access"
            {...register("otherMonetizationExplanation")}
            className="w-full text-base px-3 py-1.5 border-b border-slate-300 focus:outline-none focus:border-indigo-600 bg-transparent placeholder-slate-400"
          />
          {errors.otherMonetizationExplanation && (
            <p className="text-red-500 text-sm">
              {String(errors.otherMonetizationExplanation.message)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
