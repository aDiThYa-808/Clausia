'use client';

import { useFormContext, useWatch } from 'react-hook-form';
import { useState } from 'react';

export default function StepFour() {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const contactMethods = useWatch({ control, name: 'contactMethods' }) || [];

  return (
    <div className="space-y-6">
      {/* Q1: Supports deletion */}
      <div>
        <label className="block font-medium mb-1">Can users request data deletion?</label>
        <div className="space-x-4">
          <label>
            <input type="radio" value="yes" {...register('supportsDeletion')} />
            <span className="ml-1">Yes</span>
          </label>
          <label>
            <input type="radio" value="no" {...register('supportsDeletion')} />
            <span className="ml-1">No</span>
          </label>
        </div>
        {errors.supportsDeletion && <p className="text-red-500 text-sm">{String(errors.supportsDeletion.message)}</p>}
      </div>

      {/* Q2: Contact methods */}
      <div>
        <label className="block font-medium mb-1">How can users contact you?</label>
        <div className="space-y-1">
          {['Email', 'In-app support', 'Web contact form'].map((method) => (
            <label key={method} className="block">
              <input type="checkbox" value={method} {...register('contactMethods')} />
              <span className="ml-2">{method}</span>
            </label>
          ))}

          <label className="block mt-2">
            <input
              type="checkbox"
              value="Other"
              {...register('contactMethods')}
            />
            <span className="ml-2">Other (specify below)</span>
          </label>

          {contactMethods.includes('Other') && (
            <input
              type="text"
              placeholder="e.g., Telegram @handle"
              {...register('otherContactMethod')}
              className="mt-2 w-full border px-3 py-2 rounded-md"
            />
          )}
        </div>

        {errors.contactMethods && <p className="text-red-500 text-sm">{String(errors.contactMethods.message)}</p>}
      </div>
    </div>
  );
}
