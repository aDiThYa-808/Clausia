import { createSupabaseServerClient } from "@/lib/supabase/supabaseServer";
import DashboardClient from "../components/DashboardClient";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: userData,
    error: userError,
  } = await supabase.auth.getUser();

  if (!userData?.user) {
    // redirect to login
    return <p>Not logged in</p>;
  }

  const { data: policies, error } = await supabase
    .from("Policy")
    .select("id, product_name, product_type, last_updated, status")
    .eq("profile_id", userData.user.id)
    .order("created_at", { ascending: false });

  return (
    <DashboardClient
      user={userData.user}
      policies={policies || []}
    />
  );
}
