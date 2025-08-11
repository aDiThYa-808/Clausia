import { createSupabaseServerClient } from "@/lib/supabase/supabaseServerClient";
import DashboardPolicyList from "../components/MainDashboard/DashboardPolicyList";
import { redirect } from "next/navigation";
import DashboardNavbar from "../components/MainDashboard/DashboardNavbar";

export default async function DashboardPage() {
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

  // SYNC PROFILE LOGIC
  try {
    console.log("🔄 Checking/syncing profile for user:", userData.user.id);

    const { data: existingProfile, error: fetchError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userData.user.id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("❌ Failed to fetch profile:", fetchError.message);
    } else if (!existingProfile) {
      // Profile doesn't exist, create it
      const fullName =
        userData.user.user_metadata?.full_name ??
        userData.user.user_metadata?.name ??
        "Anonymous";

      const { error: insertError } = await supabase.from("profiles").insert({
        id: userData.user.id,
        email: userData.user.email ?? "",
        fullName,
        credits: 2000,
      });

      if (insertError) {
        console.error("❌ Failed to create profile:", insertError.message);
      } else {
        console.log("✅ Profile created successfully with 2000 credits");
      }
    } else {
      console.log("✅ Profile already exists");
    }
  } catch (syncError) {
    console.error("❌ Profile sync failed:", syncError);
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

      <DashboardPolicyList policies={policies || []} credits={credits} />
    </>
  );
}
