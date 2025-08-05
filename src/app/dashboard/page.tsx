import { createSupabaseServerClient } from "@/lib/supabase/supabaseServer";
import DashboardClient from "../components/DashboardClient";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  
  const {
    data: userData,
    error: userError,
  } = await supabase.auth.getUser();

  // Handle auth errors
  if (userError) {
    console.error("Auth error:", userError);
    redirect("/login");
  }

  // Redirect if not authenticated
  if (!userData?.user) {
    redirect("/login");
  }

  // Fetch policies with error handling
  const { data: policies, error: policiesError } = await supabase
    .from("Policy")
    .select("id, product_name, product_type, last_updated, status")
    .eq("profile_id", userData.user.id)
    .order("created_at", { ascending: false });

  // Handle policies fetch error
  if (policiesError) {
    console.error("Error fetching policies:", policiesError);
  }

  const {data:creditsData,error:creditsError}= await supabase
  .from("profiles")
  .select("credits")
  .eq("id",userData.user.id)
  .single()

  if(creditsError && !creditsData){
    console.error("error fetching credits:",creditsError)

  }

  const credits = creditsData?.credits ?? 0


  return (
    <DashboardClient
      user={userData.user}
      policies={policies || []}
      credits={credits}
    />
  );
}