import { createSupabaseServerClient } from "@/lib/supabase/supabaseServerClient";
import EditorDashboardLayout from "@/app/components/EditorDashboard";
import PolicyRenderer from "@/app/components/PolicyRenderer";
import { redirect } from "next/navigation";

export default async function PolicyPreviewPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const supabase = await createSupabaseServerClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) console.error("failed to fetch user data: ", userError);

  const { data: PolicyData, error: policyError } = await supabase
    .from("Policy")
    .select("*")
    .eq("id", id)
    .single();

  if (policyError || !PolicyData) {
    return <div className="p-6 text-red-600">Error loading policy.</div>;
  }

  const { data: creditsData, error: creditsError } = await supabase
    .from("profiles")
    .select("credits")
    .eq("id", userData.user?.id)
    .single();

  if (creditsError)
    return <div className="p-6 text-red-600">Error loading credits.</div>;

  // Redirect if already published
  if (PolicyData.status === "completed") {
    redirect(`/privacypolicy/${id}`);
  }

  return (
    <EditorDashboardLayout
      productName={PolicyData.product_name}
      policyId={PolicyData.id}
      tokensUsed={PolicyData.tokens_used}
      credits={creditsData?.credits}
      date={PolicyData.created_at}
    >
      <PolicyRenderer data={PolicyData} />
    </EditorDashboardLayout>
  );
}
