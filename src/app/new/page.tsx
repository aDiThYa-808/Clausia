import FormWizard from "@/app/components/FormWizard";

export default function FormPage(){
    return(
        <main className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">LegalZap</h1>
        <FormWizard />
      </main>
    );
}