import { createSupabaseServerClient } from "@/lib/supabase/supabaseServer";
import EditorDashboardLayout from "@/app/components/EditorDashboard";
import PolicyRenderer from "@/app/components/PolicyRenderer";
import { redirect } from "next/navigation";

export default async function PolicyPreviewPage({ params }: { params: { id: string } }) {
  const supabase = await createSupabaseServerClient();

  const { data:PolicyData, error } = await supabase
    .from("Policy")
    .select("*")
    .eq("id", params.id)
    .single();



  if (error || !PolicyData) {
    return <div className="p-6 text-red-600">Error loading policy.</div>;
  }

  // Redirect if already published
//   if (data.status === "completed") {
//     redirect(`/privacypolicy/${params.id}`);
//   }

  return (
<EditorDashboardLayout
  productName={PolicyData.product_name}
  policyId={PolicyData.id}
  tokensUsed={PolicyData.tokens_used}
  date={PolicyData.created_at}
>
  <PolicyRenderer data={PolicyData} />
</EditorDashboardLayout>
  );
}
