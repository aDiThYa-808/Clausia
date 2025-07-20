import { supabase } from "./supabaseClient";

export const syncProfile = async (user: any) => {
  if (!user) return;

  const { error } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      email: user.email,
      fullName: user.user_metadata.full_name ?? user.user_metadata.name ?? null,
      credits: 0,
    },
    {
      onConflict: "id", // Ensures no duplicate rows
    }
  );

  if (error) {
    console.error("Failed to sync profile:", error.message);
  }
};
