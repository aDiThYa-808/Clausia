
import PolicyRenderer from "@/app/components/PolicyRenderer";
import { createSupabaseServerClient } from "@/lib/supabase/supabaseServer";
import { toast } from "sonner";
import { Toaster } from "sonner";
import dayjs from "dayjs";
import Link from "next/link";

export default async function PolicyPage(props: { params: { id: string } }) {
  
  const { params } = await props;
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("Policy")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    return <div>Error loading policy: {error.message}</div>;
  }



  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-inter">
      {/* Navbar */}
      <nav className="w-full px-8 py-4 border-b border-slate-200 bg-white/70 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-black tracking-tight">
            {data.product_name}
          </h1>
        </div>
      </nav>
  
      <PolicyRenderer data={data}/>
  
      {/* Footer */}
      <footer className="w-full border-t border-slate-200 px-6 py-8 text-sm text-slate-500 bg-slate-50 text-center">
        <p>
          <span className="font-medium">Crafted with love</span> — by <span className="font-semibold text-black">Clausia</span>
        </p>
      </footer>
    </div>
  )
  
}
