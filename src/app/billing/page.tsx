
import { createSupabaseServerClient } from "@/lib/supabase/supabaseServerClient";
import { redirect } from "next/navigation";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import BillingHistory from "../components/billing/BillingHistory";
import { Transaction } from "@/types/transactionType";
import DashboardFooter from "../components/dashboard/DashboardFooter";

export default async function BillingHistoryPage() {
  const supabase = await createSupabaseServerClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    //console.error("Auth error:", userError);
    redirect("/login");
  }

  if (!userData?.user) redirect("/login");

  // Fetch transaction history
  const { data: transactionData, error: transactionError } = await supabase
    .from("transactions")
    .select("id, razorpay_order_id, razorpay_payment_id, amount, currency, status, created_at")
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false });

  if (transactionError) console.error("Error fetching transactions:", transactionError);
  

  const transactions: Transaction[] = (transactionData as Transaction[]) || [];


  // Fetch credits
  const { data: creditsData, error: creditsError } = await supabase
    .from("profiles")
    .select("credits")
    .eq("id", userData.user.id)
    .single();

  if (creditsError) console.error("Error fetching credits:", creditsError);

  const credits: number = creditsData?.credits ?? 0;

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNavbar user={userData.user} credits={credits} />
  
    <main className="flex-1">
      <BillingHistory transactions={transactions} />
    </main>
  
    <DashboardFooter />
</div>
  );
}
