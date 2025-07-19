import FormWizard from "@/app/components/QuestionForms/FormWizard";

export default function FormPage(){
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-4 py-16">
      <div className="w-full max-w-2xl mx-auto space-y-10">

        
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-slate-800">
            Let’s build your privacy policy
          </h1>
          <p className="text-sm text-slate-500">
            Answer a few quick questions - we’ll handle the rest.
          </p>
        </div>

        <FormWizard />
      </div>
    </div>
  );
}