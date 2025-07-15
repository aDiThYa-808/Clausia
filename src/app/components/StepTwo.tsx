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
      <div className="space-y-2">
        <h2 className="text-lg font-medium text-slate-800">
          Does your {productType} collect personal data?
        </h2>
        <div className="flex gap-4">
          {["yes", "no"].map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                value={option}
                {...register("collectsData", {
                  required: "Please select an option",
                })}
                className="accent-indigo-600"
              />
              {option === "yes" ? "Yes" : "No"}
            </label>
          ))}
        </div>
        {errors.collectsData && (
          <p className="text-red-500 text-sm">
            {String(errors.collectsData.message)}
          </p>
        )}
      </div>
  
      {/* Q2: What types of data (if yes) */}
      {collectsData === "yes" && (
        <div className="space-y-2">
          <h2 className="text-lg font-medium text-slate-800">
            What types of personal data do you collect?
          </h2>
          <div className="grid grid-cols-2 gap-y-2 max-w-md">
            {[
              "Name",
              "Email",
              "Phone",
              "Location",
              "Device ID",
              "Usage Data",
            ].map((item) => (
              <label key={item} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  value={item}
                  {...register("collectedDataTypes")}
                  className="accent-indigo-600"
                />
                {item}
              </label>
            ))}
          </div>
        </div>
      )}
  
      {/* Q3: Collection methods (if yes) */}
      {collectsData === "yes" && (
        <div className="space-y-2">
          <h2 className="text-lg font-medium text-slate-800">
            How is this data collected?
          </h2>
          <div className="grid grid-cols-2 gap-y-2 max-w-md">
            {["User input", "Automatically", "Via 3rd party SDKs"].map(
              (item) => (
                <label key={item} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    value={item}
                    {...register("dataCollectionMethods")}
                    className="accent-indigo-600"
                  />
                  {item}
                </label>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
  
}