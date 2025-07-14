"use client";

import { useFormContext } from "react-hook-form";

export default function StepOne() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      {/* App Name */}
      <div>
        <label className="block font-medium">App Name</label>
        <input
          {...register("appName")}
          className="w-full border px-3 py-2 rounded-md"
        />
        {errors.appName && (
          <p className="text-red-500 text-sm">
            {String(errors.appName.message)}
          </p>
        )}
      </div>

      {/* App Description */}
      <div>
        <label className="block font-medium">App Description</label>
        <textarea
          {...register("appDescription")}
          className="w-full border px-3 py-2 rounded-md"
        />
        {errors.appDescription && (
          <p className="text-red-500 text-sm">
            {String(errors.appDescription.message)}
          </p>
        )}
      </div>

    {/*target age group */}
      <div className="mb-4">
        <label className="block font-medium mb-2">
          What is your app's target age group?
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
