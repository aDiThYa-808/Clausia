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
    <div className="space-y-6">
      {/*product type */}
      <div className="mb-4">
        <label className="block font-medium mb-2">
          What type of product is this?
        </label>

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" value="app" {...register("productType")} />
            App
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" value="game" {...register("productType")} />
            Game
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" value="website" {...register("productType")} />
            Website
          </label>
        </div>

        {errors.productType && (
          <p className="text-red-500 text-sm mt-1">
            {String(errors.productType.message)}
          </p>
        )}
      </div>

      {/* App Name */}
      <div>
        <label className="block font-medium">{label} Name</label>
        <input
          {...register("productName")}
          className="w-full border px-3 py-2 rounded-md"
        />
        {errors.productName && (
          <p className="text-red-500 text-sm">
            {String(errors.productName.message)}
          </p>
        )}
      </div>

      {/* App Description */}
      <div>
        <label className="block font-medium">{label} Description</label>
        <textarea
          {...register("productDescription")}
          className="w-full border px-3 py-2 rounded-md"
        />
        {errors.productDescription && (
          <p className="text-red-500 text-sm">
            {String(errors.productDescription.message)}
          </p>
        )}
      </div>

      {/*target age group */}
      <div className="mb-4">
        <label className="block font-medium mb-2">
          What is your {productType}'s target age group?
        </label>
        <div className="space-y-1">
          <label>
            <input
              type="radio"
              value="under13"
              {...register("ageGroup")}
              className="mr-2"
            />
            Under 13
          </label>
          <label>
            <input
              type="radio"
              value="13to17"
              {...register("ageGroup")}
              className="mr-2"
            />
            13-17
          </label>
          <label>
            <input
              type="radio"
              value="18plus"
              {...register("ageGroup")}
              className="mr-2"
            />
            18+
          </label>
          <label>
            <input
              type="radio"
              value="all"
              {...register("ageGroup")}
              className="mr-2"
            />
            All age groups
          </label>
          <label>
            <input
              type="radio"
              value="unsure"
              {...register("ageGroup")}
              className="mr-2"
            />
            Not sure
          </label>
        </div>
        {errors.ageGroup && (
          <p className="text-red-500 text-sm">
            {String(errors.ageGroup.message)}
          </p>
        )}
      </div>

      {/* Contact Email */}
      <div>
        <label className="block font-medium">Contact Email</label>
        <input
          {...register("contactEmail")}
          type="email"
          className="w-full border px-3 py-2 rounded-md"
        />
        {errors.contactEmail && (
          <p className="text-red-500 text-sm">
            {String(errors.contactEmail.message)}
          </p>
        )}
      </div>
    </div>
  );
}
