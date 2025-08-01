import dayjs from "dayjs";

export default function PolicyRenderer({ data }: { data: any }) {
  return (
    <div className="px-6 md:px-12 py-16 max-w-4xl mx-auto">
      <div className="mb-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-black mb-4">Privacy Policy</h1>
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

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-black mb-4">Introduction</h2>
        <p className="text-base text-slate-800 leading-relaxed whitespace-pre-line">
          {data.introduction}
        </p>
      </section>

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
    </div>
  );
}
