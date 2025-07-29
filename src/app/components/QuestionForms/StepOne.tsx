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
    <div className="space-y-16">
      {/* Product Type */}
      <div className="space-y-4">
        <h2 className="text-base font-medium text-slate-700">What type of product is this?</h2>
        <div className="flex flex-wrap gap-2">
          {["app", "game", "website"].map((type) => (
            <label
              key={type}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition cursor-pointer
                ${
                  productType === type
                    ? "bg-[#BC3FDE] text-white border-[#BC3FDE]"
                    : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
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
          <p className="text-sm text-red-500">{errors.productType.message as string}</p>
        )}
      </div>
  
      {/* Product Name */}
      <div className="space-y-3">
        <label className="block text-base font-medium text-slate-700">
          What is your {productType || "product"} called?
        </label>
        <input
          {...register("productName", { required: "Product name is required" })}
          className="w-full px-4 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#BC3FDE] bg-white placeholder-slate-400"
          placeholder="e.g. Whatsapp"
        />
        {errors.productName && (
          <p className="text-sm text-red-500">{errors.productName.message as string}</p>
        )}
      </div>
  
      {/* Description */}
      <div className="space-y-3">
        <label className="block text-base font-medium text-slate-700">
          Describe your {productType || "product"} in one line
        </label>
        <textarea
          {...register("productDescription", {
            required: "Description is required",
          })}
          rows={3}
          className="w-full px-4 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#BC3FDE] placeholder-slate-400"
          placeholder="e.g. A group chat app for close friends"
        />
        {errors.productDescription && (
          <p className="text-sm text-red-500">{errors.productDescription.message as string}</p>
        )}
      </div>
  
      {/* Age Group */}
      <div className="space-y-4">
        <h2 className="text-base font-medium text-slate-700">Who is this {productType || "product"} for?</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "under13", label: "Under 13" },
            { value: "13to17", label: "13–17" },
            { value: "18plus", label: "18+" },
            { value: "all", label: "All age groups" },
            { value: "unsure", label: "Not sure" },
          ].map(({ value, label }) => (
            <label
              key={value}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition cursor-pointer
                ${
                  watch("ageGroup") === value
                    ? "bg-[#BC3FDE] text-white border-[#BC3FDE]"
                    : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                }`}
            >
              <input
                type="radio"
                value={value}
                {...register("ageGroup", { required: "Select an age group" })}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </div>
        {errors.ageGroup && (
          <p className="text-sm text-red-500">{errors.ageGroup.message as string}</p>
        )}
      </div>
  
      {/* Contact Email */}
      <div className="space-y-3">
        <label className="block text-base font-medium text-slate-700">
          Where can users contact you?
        </label>
        <input
          type="email"
          {...register("contactEmail", { required: "Email is required" })}
          placeholder="you@example.com"
          className="w-full px-4 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#BC3FDE] bg-white placeholder-slate-400"
        />
        {errors.contactEmail && (
          <p className="text-sm text-red-500">{errors.contactEmail.message as string}</p>
        )}
      </div>
    </div>
  );
  
}
