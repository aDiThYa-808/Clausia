'use client';

import { useFormContext, useWatch } from 'react-hook-form';

export default function StepTwo() {
  const {
    register,
    watch,
    formState: { errors },
    control,
  } = useFormContext();

  const collectsData = useWatch({ control, name: 'collectsData' });
  const productType = watch("productType") || "app";

return (
    <div className="space-y-20">
  
      {/* Q1: Collects data? */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-slate-800">
          Does your {productType} collect personal data?
        </h2>
        <div className="flex gap-4">
          {["yes", "no"].map((option) => (
            <label
              key={option}
              className={`cursor-pointer px-5 py-2 rounded-full border text-sm font-medium transition
                ${collectsData === option
                  ? "border-blue-600 bg-blue-600/10 text-blue-600"
                  : "border-slate-200 text-slate-600 hover:border-blue-600 hover:text-blue-600"
                }`}
            >
              <input
                type="radio"
                value={option}
                {...register("collectsData", {
                  required: "Please select an option",
                })}
                className="sr-only"
              />
              {option === "yes" ? "Yes" : "No"}
            </label>
          ))}
        </div>
        {errors.collectsData && (
          <p className="text-sm text-red-500">
            {String(errors.collectsData.message)}
          </p>
        )}
      </div>
  
      {/* Q2: Data types */}
      {collectsData === "yes" && (
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-slate-800">
            What types of personal data do you collect?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg">
            {["Name", "Email", "Phone", "Location", "Device ID", "Usage Data"].map((item) => (
              <label
                key={item}
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-slate-200 hover:border-blue-600 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={item}
                  {...register("collectedDataTypes")}
                  className="accent-blue-600"
                />
                {item}
              </label>
            ))}
          </div>
        </div>
      )}
  
      {/* Q3: Collection methods */}
      {collectsData === "yes" && (
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-slate-800">
            How is this data collected?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg">
            {["User input", "Automatically", "Via 3rd party SDKs"].map((item) => (
              <label
                key={item}
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-slate-200 hover:border-blue-600 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={item}
                  {...register("dataCollectionMethods")}
                  className="accent-blue-600"
                />
                {item}
              </label>
            ))}
          </div>
        </div>
      )}
  
    </div>
  );
}