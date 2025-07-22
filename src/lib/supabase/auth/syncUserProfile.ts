import { supabase } from "./supabaseClient";

export const syncProfile = async (user: any) => {
  if (!user) return;

  const fullName =
    user.user_metadata?.full_name ??
    user.user_metadata?.name ??
    "Anonymous";

  const { error } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      email: user.email ?? "", // if NOT NULL
      fullName: fullName,
      credits: 0, // ensure this column exists and is not nullable
    },
    { onConflict: "id" }
  );

  if (error) {
    console.error("❌ Failed to sync profile:", error.message);
  }
};
