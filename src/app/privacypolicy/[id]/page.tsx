
import { createSupabaseServerClient } from "@/lib/supabase/supabaseServer";
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
  
      {/* Main Content */}
      <main className="flex-1 px-6 md:px-12 py-16 max-w-4xl mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-sm text-slate-500">
            Last updated on {dayjs(data.last_updated).format("MMMM D, YYYY")}
          </p>
        </div>
  
        <div className="mb-12">
          <p className="text-lg text-slate-700 leading-relaxed">
            Welcome to <span className="font-semibold text-black">{data.product_name}</span>'s Privacy Policy.
            Please read it carefully to understand how your data is collected and used.
          </p>
        </div>
  
        {/* Introduction */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-black mb-4">Introduction</h2>
          <p className="text-base text-slate-800 leading-relaxed whitespace-pre-line">
            {data.introduction}
          </p>
        </section>
  
        {/* Dynamic Sections */}
        {data.section_titles?.map((title: string, idx: number) => (
          <section
            key={idx}
            className="mb-16 border-l-4 border-indigo-500 pl-6 transition-all duration-300 ease-in-out"
          >
            <h2 className="text-2xl font-semibold text-black mb-3">{title}</h2>
            <p className="text-base text-slate-800 leading-relaxed whitespace-pre-line">
              {data.section_bodies?.[idx]}
            </p>
          </section>
        ))}
      </main>
  
      {/* Footer */}
      <footer className="w-full border-t border-slate-200 px-6 py-8 text-sm text-slate-500 bg-slate-50 text-center">
        <p>
          <span className="font-medium">Crafted with love</span> — by <span className="font-semibold text-black">Clausia</span>
        </p>
      </footer>
    </div>
  )
  
}
