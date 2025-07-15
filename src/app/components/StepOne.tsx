"use client";

import { useFormContext } from "react-hook-form";

export default function StepOne() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const productType = watch("productType") || "app";
  const label = productType.charAt(0).toUpperCase() + productType.slice(1);

  

  return (
    <div className="space-y-20">
      {/* Product Type */}
      <div className="space-y-3">
        <h2 className="text-lg font-medium text-slate-800">
          What type of product is this?
        </h2>
        <div className="flex flex-wrap gap-2">
          {["app", "game", "website"].map((type) => (
            <label
              key={type}
              className={`px-3 py-1.5 rounded-full border text-sm cursor-pointer transition
                ${
                  productType === type
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-slate-700 border-slate-300 hover:border-slate-500"
                }`}
            >
              <input
                type="radio"
                value={type}
                {...register("productType", {
                  required: "Select a product type",
                })}
                className="sr-only"
              />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>
        {errors.productType && (
          <p className="text-red-500 text-sm">
            {errors.productType.message as string}
          </p>
        )}
      </div>

      {/* Product Name */}
      <div className="space-y-2">
        <h2 className="text-lg font-medium text-slate-800">
          What is your {productType || "product"} called?
        </h2>
        <input
          {...register("productName", { required: "Product name is required" })}
          className="w-full text-base px-3 py-1.5 border-b border-slate-300 focus:outline-none focus:border-indigo-600 bg-transparent placeholder-slate-400"
          placeholder="e.g. Whatsapp"
        />
        {errors.productName && (
          <p className="text-red-500 text-sm">
            {errors.productName.message as string}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h2 className="text-lg font-medium text-slate-800">
          Describe your {productType || "product"} in one line
        </h2>
        <textarea
          {...register("productDescription", {
            required: "Description is required",
          })}
          className="w-full text-base px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-indigo-600 placeholder-slate-400"
          rows={3}
          placeholder="e.g. A group chat app for close friends"
        />
        {errors.productDescription && (
          <p className="text-red-500 text-sm">
            {errors.productDescription.message as string}
          </p>
        )}
      </div>

      {/* Target Age Group */}
      <div className="space-y-2">
        <h2 className="text-lg font-medium text-slate-800">
          Who is this {productType || "product"} for?
        </h2>
        <div className="grid grid-cols-2 gap-2 max-w-md">
          {[
            { value: "under13", label: "Under 13" },
            { value: "13to17", label: "13–17" },
            { value: "18plus", label: "18+" },
            { value: "all", label: "All age groups" },
            { value: "unsure", label: "Not sure" },
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                value={value}
                {...register("ageGroup", { required: "Select an age group" })}
                className="accent-indigo-600"
              />
              {label}
            </label>
          ))}
        </div>
        {errors.ageGroup && (
          <p className="text-red-500 text-sm">
            {errors.ageGroup.message as string}
          </p>
        )}
      </div>

      {/* Contact Email */}
      <div className="space-y-2">
        <h2 className="text-lg font-medium text-slate-800">
          Where can users contact you?
        </h2>
        <input
          type="email"
          {...register("contactEmail", { required: "Email is required" })}
          placeholder="you@example.com"
          className="w-full text-base px-3 py-1.5 border-b border-slate-300 bg-transparent focus:outline-none focus:border-indigo-600 placeholder-slate-400"
        />
        {errors.contactEmail && (
          <p className="text-red-500 text-sm">
            {errors.contactEmail.message as string}
          </p>
        )}
      </div>
    </div>
  );
}
