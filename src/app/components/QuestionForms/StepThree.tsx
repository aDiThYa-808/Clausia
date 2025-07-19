"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { useState } from "react";

export default function StepThree() {
  const {
    register,
    watch,
    formState: { errors },
    control,
  } = useFormContext();

  const usesSDKs = useWatch({ control, name: "usesSDKs" });
  const thirdPartySDKs = useWatch({ control, name: "thirdPartySDKs" }) || [];
  const [customSDK, setCustomSDK] = useState("");
  const productType = watch("productType") || "app";

  return (
    <div className="space-y-20">
      {/* Q1: Uses third-party SDKs? */}
      <div className="space-y-2">
        <h2 className="text-lg font-medium text-slate-800">
          Does your {productType} use third-party SDKs?
        </h2>
        <div className="flex gap-4">
          {["yes", "no"].map((val) => (
            <label key={val} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                value={val}
                {...register("usesSDKs", {
                  required: "Please select an option",
                })}
                className="accent-indigo-600"
              />
              {val === "yes" ? "Yes" : "No"}
            </label>
          ))}
        </div>
        {errors.usesSDKs && (
          <p className="text-red-500 text-sm">
            {String(errors.usesSDKs.message)}
          </p>
        )}
      </div>

      {/* Q2: Which SDKs */}
      {usesSDKs === "yes" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-slate-800">
              Which SDKs does your {productType} use?
            </h2>
            <div className="grid grid-cols-2 gap-y-2 max-w-md">
              {[
                "Firebase",
                "Google Analytics",
                "Facebook SDK",
                "OneSignal",
                "RevenueCat",
                "Not Sure",
              ].map((sdk) => (
                <label key={sdk} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    value={sdk}
                    {...register("thirdPartySDKs")}
                    className="accent-indigo-600"
                  />
                  {sdk}
                </label>
              ))}
            </div>
          </div>

          {/* Optional: Add custom SDK */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                value="Other"
                {...register("thirdPartySDKs")}
                className="accent-indigo-600"
              />
              Other (specify below)
            </label>

            {thirdPartySDKs.includes("Other") && (
              <input
                type="text"
                placeholder="e.g. Supabase"
                {...register("otherthirdPartySDKs")}
                className="w-full text-base px-3 py-1.5 border-b border-slate-300 focus:outline-none focus:border-indigo-600 bg-transparent placeholder-slate-400"
              />
            )}
          </div>

          {errors.thirdPartySDKs && (
            <p className="text-red-500 text-sm">
              {String(errors.thirdPartySDKs.message)}
            </p>
          )}
        </div>
      )}

      {/* Q3: Storage location */}
      <div className="space-y-2">
        <h2 className="text-lg font-medium text-slate-800">
          Where is your user data stored?
        </h2>
        <select
          {...register("dataStorageRegion", {
            required: "Please select a data region",
          })}
          className="w-full text-base px-3 py-1.5 border-b border-slate-300 focus:outline-none focus:border-indigo-600 bg-transparent text-slate-800"
        >
          <option value="">-- Select a region --</option>
          <option value="India">India</option>
          <option value="United States">United States</option>
          <option value="European Union">European Union</option>
          <option value="Multiple Regions">Multiple Regions</option>
          <option value="Not Stored">Data is not stored</option>
          <option value="Not sure / managed by third-party provider">
            Not sure / managed by third-party provider
          </option>
        </select>
        {errors.dataStorageRegion && (
          <p className="text-red-500 text-sm">
            {String(errors.dataStorageRegion.message)}
          </p>
        )}
      </div>
    </div>
  );
}
