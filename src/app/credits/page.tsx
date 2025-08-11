import { redirect } from "next/navigation";
import DashboardNavbar from "../components/MainDashboard/DashboardNavbar";
import { createSupabaseServerClient } from "@/lib/supabase/supabaseServerClient";
import CreditPacks from "../components/MainDashboard/CreditsPacks";

export default async function CreditsPage() {
  const supabase = await createSupabaseServerClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  // Handle auth errors
  if (userError) {
    console.error("Auth error:", userError);
    redirect("/login");
  }

  // Redirect if not authenticated
  if (!userData?.user) {
    redirect("/login");
  }

  // Fetch credits (should work now that profile exists)
  const { data: creditsData, error: creditsError } = await supabase
    .from("profiles")
    .select("credits")
    .eq("id", userData.user.id)
    .single();

  if (creditsError && !creditsData) {
    console.error("error fetching credits:", creditsError);
  }

  const credits = creditsData?.credits ?? 0;

  return (
    <>
      <DashboardNavbar user={userData.user} credits={credits} />
      <CreditPacks />
    </>
  );
}
