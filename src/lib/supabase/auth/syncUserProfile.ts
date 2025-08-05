import { supabase } from "./supabaseClient";

export const syncProfile = async (user: any) => {
  if (!user) return;

  const { data, error: fetchError } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.error("❌ Failed to fetch profile:", fetchError.message);
    return;
  }

  // Insert only if not found
  if (!data) {
    const fullName =
      user.user_metadata?.full_name ??
      user.user_metadata?.name ??
      "Anonymous";

    const { error } = await supabase.from("profiles").insert({
      id: user.id,
      email: user.email ?? "",
      fullName,
      credits: 2000,
    });

    if (error) {
      console.error("❌ Failed to insert profile:", error.message);
    }
  }
};
