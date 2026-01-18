"use client";

import { useFormContext, useWatch } from "react-hook-form";

export default function StepThree() {
  const {
    register,
    watch,
    formState: { errors },
    control,
  } = useFormContext();

  const usesSDKs = useWatch({ control, name: "usesSDKs" });
  const thirdPartySDKs = useWatch({ control, name: "thirdPartySDKs" }) || [];
  const productType = watch("productType") || "app";

return (
    <div className="space-y-20">
      {/* Q1: Uses third-party SDKs? */}
      <div className="space-y-2">
        <h2 className="text-lg font-medium text-slate-800">
          Does your {productType} use third-party SDKs?
        </h2>
        <div className="flex gap-4">
          {["yes", "no"].map((option) => (
            <label key={option} className="relative">
              <input
                type="radio"
                value={option}
                {...register("usesSDKs", {
                  required: "Please select an option",
                })}
                className="peer sr-only"
              />
              <div className="px-4 py-1.5 text-sm rounded-full border border-slate-300 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-600 hover:border-blue-600 cursor-pointer transition">
                {option === "yes" ? "Yes" : "No"}
              </div>
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
        <div className="space-y-2">
          <h2 className="text-lg font-medium text-slate-800">
            Which SDKs does your {productType} use?
          </h2>
          <div className="flex flex-wrap gap-2 max-w-md">
            {[
              "Firebase",
              "Google Analytics",
              "Facebook SDK",
              "OneSignal",
              "RevenueCat",
              "Not Sure",
              "Other",
            ].map((sdk) => (
              <label key={sdk} className="relative">
                <input
                  type="checkbox"
                  value={sdk}
                  {...register("thirdPartySDKs")}
                  className="peer sr-only"
                />
                <div className="px-3 py-1.5 text-sm rounded-full border border-slate-300 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-600 hover:border-blue-600 cursor-pointer transition">
                  {sdk}
                </div>
              </label>
            ))}
          </div>

          {thirdPartySDKs.includes("Other") && (
            <input
              type="text"
              placeholder="e.g. Supabase"
              {...register("otherthirdPartySDKs")}
              className="w-full text-base px-3 py-1.5 border-b border-slate-300 focus:outline-none focus:border-blue-600 bg-transparent placeholder-slate-400"
            />
          )}
        </div>
      )}

      {/* Q3: Storage location */}
      <div className="space-y-2">
        <h2 className="text-lg font-medium text-slate-800">
          Where is your user data stored?
        </h2>
        <div className="relative max-w-md">
          <select
            {...register("dataStorageRegion", {
              required: "Please select a data region",
            })}
            className="w-full appearance-none text-base px-4 py-2 pr-10 border border-slate-300 rounded-full bg-transparent text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 hover:border-blue-600 transition"
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
          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400 text-xs">
            ▼
          </div>
        </div>
        {errors.dataStorageRegion && (
          <p className="text-red-500 text-sm">
            {String(errors.dataStorageRegion.message)}
          </p>
        )}
      </div>
    </div>
  );
}
