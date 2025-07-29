import FormWizard from "@/app/components/QuestionForms/FormWizard";

export default function FormPage(){
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-4 py-16">
      <div className="w-full max-w-2xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Let’s build your privacy policy
          </h1>
          <p className="text-base text-slate-500 leading-relaxed">
            Answer a few quick questions — we’ll handle the rest.
          </p>
        </div>
  
        {/* Form */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-8">
          <FormWizard />
        </div>
      </div>
    </div>
  );
  
}