'use client';

import { useFormContext, useWatch } from 'react-hook-form';
import { useState } from 'react';

export default function StepThree() {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const usesSDKs = useWatch({ control, name: 'usesSDKs' });
  const [customSDK, setCustomSDK] = useState('');

  return (
    <div className="space-y-6">
      {/* Q1: Uses third-party SDKs */}
      <div>
        <label className="block font-medium mb-1">Does your app use third-party SDKs?</label>
        <div className="space-x-4">
          <label>
            <input type="radio" value="yes" {...register('usesSDKs')} />
            <span className="ml-1">Yes</span>
          </label>
          <label>
            <input type="radio" value="no" {...register('usesSDKs')} />
            <span className="ml-1">No</span>
          </label>
        </div>
        {errors.usesSDKs && <p className="text-red-500 text-sm">{String(errors.usesSDKs.message)}</p>}
      </div>

      {/* Q2: Which SDKs */}
      {usesSDKs === 'yes' && (
        <div>
          <label className="block font-medium mb-1">Select SDKs used:</label>
          <div className="space-y-1">
            {['Firebase', 'Google Analytics', 'Facebook SDK', 'OneSignal', 'RevenueCat', 'Not Sure'].map((sdk) => (
              <label key={sdk} className="block">
                <input type="checkbox" value={sdk} {...register('thirdPartySDKs')} />
                <span className="ml-2">{sdk}</span>
              </label>
            ))}
          </div>

          {/* Optional: Add custom SDK */}
          <div className="mt-2 flex items-center gap-2">
            <input
              type="text"
              value={customSDK}
              onChange={(e) => setCustomSDK(e.target.value)}
              placeholder="Other SDK..."
              className="border px-2 py-1 rounded-md"
            />
            <button
              type="button"
              onClick={() => {
                if (customSDK.trim()) {
                  const event = {
                    target: { value: customSDK.trim(), checked: true, name: 'thirdPartySDKs' },
                  };
                  register('thirdPartySDKs').onChange(event);
                  setCustomSDK('');
                }
              }}
              className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
            >
              Add
            </button>
          </div>

          {errors.thirdPartySDKs && <p className="text-red-500 text-sm">{String(errors.thirdPartySDKs.message)}</p>}
        </div>
      )}

      {/* Q3: Storage location */}
      <div>
        <label className="block font-medium mb-1">Where is user data stored?</label>
        <select {...register('dataStorageRegion')} className="border px-3 py-2 rounded-md w-full">
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
        {errors.dataStorageRegion && <p className="text-red-500 text-sm">{String(errors.dataStorageRegion.message)}</p>}
      </div>
    </div>
  );
}
