import { createSupabaseServerClient } from "@/lib/supabase/supabaseServer";
import EditorDashboardLayout from "@/app/components/EditorDashboard";
import PolicyRenderer from "@/app/components/PolicyRenderer";
import { redirect } from "next/navigation";

export default async function PolicyPreviewPage({ params }: { params: { id: string } }) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("Policy")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    return <div className="p-6 text-red-600">Error loading policy.</div>;
  }

  // Redirect if already published
//   if (data.status === "completed") {
//     redirect(`/privacypolicy/${params.id}`);
//   }

  return (
<EditorDashboardLayout
  productName={data.product_name}
  policyId={data.id}
>
  <PolicyRenderer data={data} />
</EditorDashboardLayout>
  );
}
