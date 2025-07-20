"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Preview() {
  const [policy, setPolicy] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("previewPolicy");
    if (data) setPolicy(JSON.parse(data));
  }, []);

  if (!policy) return <p>Loading preview...</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{policy.productName}</h1>
      <p className="text-sm text-gray-500 mb-6">{policy.lastUpdated}</p>
      <p className="mb-10">{policy.introduction}</p>
      <div className="space-y-8">
        {policy.sections.map((section: any, index: number) => (
          <div key={index}>
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="text-gray-700">{section.content}</p>
          </div>
        ))}
      </div>
      <button
        className="mt-10 px-6 py-2 bg-indigo-600 text-white rounded-xl"
        onClick={async () => {
          const res = await fetch("/api/store-policy", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(policy),
          });
          const { id } = await res.json();
          if (id) {
            window.location.href = `/policy/${id}`;
          }
        }}
      >
        Save and Publish
      </button>
    </div>
  );
}
