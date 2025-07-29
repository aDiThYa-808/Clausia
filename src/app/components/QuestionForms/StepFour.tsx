"use client";

import { useFormContext, useWatch } from "react-hook-form";

export default function StepFour() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const supportsDeletion = useWatch({ control, name: "supportsDeletion" });
  const contactMethods = useWatch({ control, name: "contactMethods" }) || [];

  const radioOptions = ["yes", "no"];
  const contactOptions = ["Email", "In-app support", "Web contact form", "Other"];

  return (
    <div className="space-y-20">
      {/* Q1: Supports data deletion */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-slate-800">
          Can users request data deletion?
        </h2>
        <div className="flex gap-4">
          {radioOptions.map((option) => {
            const isSelected = supportsDeletion === option;
            return (
              <label
                key={option}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium cursor-pointer transition
                  hover:border-[#BC3FDE] hover:text-[#BC3FDE]
                  ${isSelected ? "border-[#BC3FDE] bg-[#BC3FDE]/10" : "border-slate-300"}`}
              >
                <input
                  type="radio"
                  value={option}
                  {...register("supportsDeletion", {
                    required: "Please select an option",
                  })}
                  className="sr-only"
                />
                {option === "yes" ? "Yes" : "No"}
              </label>
            );
          })}
        </div>
        {errors.supportsDeletion && (
          <p className="text-sm text-red-500">
            {String(errors.supportsDeletion.message)}
          </p>
        )}
      </div>

      {/* Q2: Contact methods */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-slate-800">
          How can users contact you?
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg">
          {contactOptions.map((method) => {
            const isChecked = contactMethods.includes(method);
            return (
              <label
                key={method}
                className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md border cursor-pointer transition
                  ${isChecked ? "border-[#BC3FDE] bg-[#BC3FDE]/10" : "border-slate-300 hover:border-[#BC3FDE] hover:bg-[#BC3FDE]/10"}`}
              >
                <input
                  type="checkbox"
                  value={method}
                  {...register("contactMethods")}
                  className="sr-only"
                />
                {method === "Other" ? "Other (specify below)" : method}
              </label>
            );
          })}
        </div>

        {contactMethods.includes("Other") && (
          <input
            type="text"
            placeholder="e.g., Telegram @handle"
            {...register("otherContactMethod")}
            className="w-full text-base px-3 py-2 border rounded-md border-slate-300 focus:outline-none focus:border-[#BC3FDE] bg-white placeholder-slate-400"
          />
        )}

        {errors.contactMethods && (
          <p className="text-sm text-red-500">
            {String(errors.contactMethods.message)}
          </p>
        )}
      </div>
    </div>
  );
}