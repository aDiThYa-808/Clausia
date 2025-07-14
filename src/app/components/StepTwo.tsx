'use client';

import { useFormContext, useWatch } from 'react-hook-form';

export default function StepTwo() {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const collectsData = useWatch({ control, name: 'collectsData' });

  return (
    <div className="space-y-6">

      {/* Q1: Collects data? */}
      <div>
        <label className="block font-medium mb-1">Does your app collect personal data?</label>
        <div className="space-x-4">
          <label>
            <input type="radio" value="yes" {...register('collectsData')} />
            <span className="ml-1">Yes</span>
          </label>
          <label>
            <input type="radio" value="no" {...register('collectsData')} />
            <span className="ml-1">No</span>
          </label>
        </div>
        {errors.collectsData && (
          <p className="text-red-500 text-sm">{String(errors.collectsData.message)}</p>
        )}
      </div>

      {/* Q2: If yes, what data types? */}
      {collectsData === 'yes' && (
        <div>
          <label className="block font-medium mb-1">What types of personal data do you collect?</label>
          <div className="space-y-1">
            {['Name', 'Email', 'Phone', 'Location', 'Device ID', 'Usage Data'].map((item) => (
              <label key={item} className="block">
                <input
                  type="checkbox"
                  value={item}
                  {...register('collectedDataTypes')}
                />
                <span className="ml-2">{item}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Q3: How is data collected? */}
      {collectsData === 'yes' && (
        <div>
          <label className="block font-medium mb-1">How is data collected?</label>
          <div className="space-y-1">
            {['User input', 'Automatically', 'Via 3rd party SDKs'].map((item) => (
              <label key={item} className="block">
                <input
                  type="checkbox"
                  value={item}
                  {...register('dataCollectionMethods')}
                />
                <span className="ml-2">{item}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}