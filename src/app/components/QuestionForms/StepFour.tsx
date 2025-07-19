"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { useState } from "react";

export default function StepFour() {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const contactMethods = useWatch({ control, name: "contactMethods" }) || [];

  return (
    <div className="space-y-20">
      {/* Q1: Supports data deletion */}
      <div className="space-y-2">
        <h2 className="text-lg font-medium text-slate-800">
          Can users request data deletion?
        </h2>
        <div className="flex gap-4">
          {["yes", "no"].map((val) => (
            <label key={val} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                value={val}
                {...register("supportsDeletion", {
                  required: "Please select an option",
                })}
                className="accent-indigo-600"
              />
              {val === "yes" ? "Yes" : "No"}
            </label>
          ))}
        </div>
        {errors.supportsDeletion && (
          <p className="text-red-500 text-sm">
            {String(errors.supportsDeletion.message)}
          </p>
        )}
      </div>

      {/* Q2: Contact methods */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-medium text-slate-800">
            How can users contact you?
          </h2>
          <div className="grid grid-cols-2 gap-y-2 max-w-md">
            {["Email", "In-app support", "Web contact form"].map((method) => (
              <label key={method} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  value={method}
                  {...register("contactMethods")}
                  className="accent-indigo-600"
                />
                {method}
              </label>
            ))}
          </div>
        </div>

        {/* Optional: Other contact method */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              value="Other"
              {...register("contactMethods")}
              className="accent-indigo-600"
            />
            Other (specify below)
          </label>

          {contactMethods.includes("Other") && (
            <input
              type="text"
              placeholder="e.g., Telegram @handle"
              {...register("otherContactMethod")}
              className="w-full text-base px-3 py-1.5 border-b border-slate-300 focus:outline-none focus:border-indigo-600 bg-transparent placeholder-slate-400"
            />
          )}
        </div>

        {errors.contactMethods && (
          <p className="text-red-500 text-sm">
            {String(errors.contactMethods.message)}
          </p>
        )}
      </div>
    </div>
  );
}
