import dayjs from "dayjs";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const data = {
    product_name: "Clausia",
    last_updated: "2025-08-08",
    introduction: `This Privacy Policy explains how Clausia ("we", "our", or "us") collects, uses, and safeguards your information when you use our application. We are committed to protecting your privacy and ensuring your personal information is handled in compliance with applicable Indian laws.`,
    section_titles: [
      "1. Contact Information",
      "2. Information We Collect",
      "3. How We Use Your Information",
      "4. Data Sharing and Disclosure",
      "5. Data Storage and Security",
      "6. Data Retention",
      "7. User Rights",
      "8. Payment Processing",
      "9. Third-Party Services",
      "10. Children's Privacy",
      "11. Changes to This Privacy Policy",
    ],
    section_bodies: [
      `If you have any questions about this Privacy Policy or your data, please contact us at:
Email: support@clausia.app`,

      `We collect the following personal information when you use our service:
- Name
- Email address
- Information you provide when answering policy generation questions
We also automatically collect certain technical data via Vercel Analytics (such as general usage patterns) to improve our service.`,

      `We use your personal information to:
- Generate privacy policy documents based on your inputs
- Maintain your account and store generated policies
- Provide customer support
- Improve the functionality and reliability of our application`,

      `We do not sell, rent, or share your personal information with any advertisers or marketers.
Your data is only shared with:
- OpenAI API (to process your inputs for generating policies)
- Razorpay (for processing payments)
We do not use your data for model training and do not send it to any other third parties beyond what is necessary to provide our services.`,

      `All data you provide is securely stored in our database tied to your account. We do not maintain separate backups or server logs containing your personal data. We implement appropriate technical and organizational measures to safeguard your information.`,

      `We retain your personal data and generated policies until you delete them or your account. You may delete individual policies or request complete account deletion at any time.`,

      `As a user, you have the right to:
- Access the information we hold about you
- Request correction of inaccurate data
- Request deletion of your account and all associated data
- Withdraw consent for data usage (where applicable)`,

      `All payments are securely processed through Razorpay. We do not store any payment card details on our servers. Razorpay's own privacy policy governs the use of payment information.`,

      `Our service integrates with:
- OpenAI API (to generate your documents)
- Supabase (for authentication and database)
- Razorpay (for payment processing)
- Vercel Analytics (for general usage analytics)
Please review the privacy policies of these providers to understand how they handle your data.`,

      `Our application is intended for use by individuals aged 13 and above. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal data, please contact us immediately for deletion.`,

      `We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we make changes, we will revise the "Last updated" date and notify you as required by law.`,
    ],
  };

  return (
    <>
      {/* Navbar */}
      <nav className="w-full px-6 md:px-12 py-4 border-b border-slate-200 flex justify-between items-center">
      <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            style={{ fontFamily: "chillax" }}
          >
            Clausia
          </Link>
          <a
              href="mailto:support@clausia.app"
              className="group px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-sm hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              Contact Us
            </a>
      </nav>

      {/* Main Content */}
      <div className="px-6 md:px-12 py-16 max-w-4xl mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-black mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500">
            Last updated on {dayjs(data.last_updated).format("MMMM D, YYYY")}
          </p>
        </div>

        <div className="mb-12">
          <p className="text-lg text-slate-700 leading-relaxed">
            Welcome to{" "}
            <span className="font-semibold text-black">
              {data.product_name}
            </span>
            ’s Privacy Policy. Please read it carefully to understand how your
            data is collected and used.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Introduction
          </h2>
          <p className="text-base text-slate-800 leading-relaxed whitespace-pre-line">
            {data.introduction}
          </p>
        </section>

        {data.section_titles?.map((title, idx) => (
          <section
            key={idx}
            className="mb-16 border-l-4 border-purple-600 pl-6 transition-all duration-300 ease-in-out"
          >
            <h2 className="text-2xl font-semibold text-black mb-3">{title}</h2>
            <p className="text-base text-slate-800 leading-relaxed whitespace-pre-line">
              {data.section_bodies?.[idx]}
            </p>
          </section>
        ))}
      </div>

      <footer className="py-16 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <h4
                className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
                style={{ fontFamily: "chillax" }}
              >
                Clausia
              </h4>
              <p className="text-slate-400 mb-6 max-w-md leading-relaxed">
                The fastest way for Indian developers to generate professional,
                compliant privacy policies. Built by developers, for developers.
              </p>
              <div className="space-y-2">
                <p className="text-slate-400">
                  Support:{" "}
                  <a
                    href="mailto:support@clausia.app"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    support@clausia.app
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-white">Legal</h5>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <a
                    href="/legal/privacypolicy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/legal/termsofservice"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center">
            <p className="text-slate-400">
              © 2025 Clausia. Made with ❤️ for Indian developers.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
