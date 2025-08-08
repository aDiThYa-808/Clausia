"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Clock,
  Star,
  Menu,
  X,
  ChevronDown,
  Lock,
  Globe,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [animatedElements, setAnimatedElements] = useState({
    hero: false,
    illustration: false,
    features: false,
    pricing: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      setAnimatedElements((prev) => ({
        ...prev,
        hero: true,
        features: scrollY > windowHeight * 0.2,
        pricing: scrollY > windowHeight * 0.8,
      }));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Animate illustration AFTER initial mount to trigger transition
    const timeout = setTimeout(() => {
      setAnimatedElements((prev) => ({ ...prev, illustration: true }));
    }, 100); // slight delay ensures transition triggers

    return () => clearTimeout(timeout);
  }, []);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Policy Generation",
      description:
        "Draft privacy policies in under 3 minutes using AI - no legal knowledge required.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Built for Indian Compliance",
      description:
        "Aligned with India’s IT Rules, DPDP Bill, and platform-specific requirements (Google Play, App Store).",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Continuously Maintained",
      description:
        "Policy templates are reviewed and updated regularly to reflect evolving Indian legal standards.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Provide Key Details",
      description:
        "Answer a few targeted questions about your product’s data usage, audience, and platform.",
    },
    {
      number: "02",
      title: "AI Drafts Your Policy",
      description:
        "Our model generates a privacy policy tailored to your inputs and aligned with Indian regulations.",
    },
    {
      number: "03",
      title: "Preview, Publish & Export",
      description:
        "Review the policy, share it via public link, or export it as plain text.",
    },
  ];

  const pricing = [
    {
      name: "Starter Pack",
      price: "₹0",
      period: "",
      features: [
        "2,000 free credits",
        "Policy generation",
        "Copy as text",
        "Live link hosting",
      ],
      popular: false,
      color: "from-slate-50 to-slate-100",
      actionRoute: "/login",
    },
    {
      name: "Pro Pack",
      price: "₹49",
      period: "",
      features: [
        "10,000 credits",
        "Policy generation",
        "Copy as text",
        "Live link hosting",
      ],
      popular: true,
      color: "from-purple-600 to-pink-600",
      actionRoute: "/credits",
    },
    {
      name: "Business Pack",
      price: "₹149",
      period: "",
      features: [
        "50,000 credits",
        "Policy generation",
        "Copy as text",
        "Live link hosting",
      ],
      popular: false,
      color: "from-slate-800 to-slate-900",
      actionRoute: "/credits",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 text-slate-900 overflow-x-hidden">
      {/* Enhanced Navbar */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            style={{ fontFamily: "chillax" }}
          >
            Clausia
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-700">
            <a
              href="#how-it-works"
              className="hover:text-purple-600 transition-colors relative group"
            >
              How it works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
            </a>
            <a
              href="#benefits"
              className="hover:text-purple-600 transition-colors relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
            </a>
            <a
              href="#pricing"
              className="hover:text-purple-600 transition-colors relative group"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
            </a>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="/login"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-purple-600 transition-colors"
            >
              Sign in
            </a>
            <a
              href="/dashboard"
              className="group px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-sm hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden bg-white/95 backdrop-blur-md border-t border-white/20`}
        >
          <div className="px-6 py-4 space-y-4">
            <a
              href="#how-it-works"
              className="block py-2 text-slate-700 hover:text-purple-600 transition-colors"
            >
              How it works
            </a>
            <a
              href="#benefits"
              className="block py-2 text-slate-700 hover:text-purple-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="block py-2 text-slate-700 hover:text-purple-600 transition-colors"
            >
              Pricing
            </a>
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <a
                href="/login"
                className="block py-2 text-slate-700 hover:text-purple-600 transition-colors"
              >
                Sign in
              </a>
              <a
                href="/login"
                className="block px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-center"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden bg-gradient-to-br from-slate-50 to-white">
        {/* Refined Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 -left-8 w-48 h-48 bg-purple-100/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 -right-8 w-64 h-64 bg-pink-100/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-conic from-purple-50/20 via-transparent to-pink-50/20 rounded-full blur-xl animate-spin"
            style={{ animationDuration: "30s" }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-6 transform transition-all duration-1000 ${
                animatedElements.hero
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-medium">
                <Star className="w-3.5 h-3.5 fill-current" />
                Built with feedback from Indian founders
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-slate-900">
                Generate{" "}
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 bg-clip-text text-transparent">
                  AI-powered
                </span>{" "}
                privacy policies{" "}
                <span className="relative inline-block">
                  instantly
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-2 text-purple-200"
                    viewBox="0 0 300 8"
                    fill="none"
                  >
                    <path
                      d="M0 4 Q 150 8 300 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-md">
                Stop spending hours on legal research. Clausia creates
                professional, compliant privacy policies for Indian apps, games,
                and websites in minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/login"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Start Creating Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-slate-700 font-semibold hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
                >
                  See How It Works
                  <ChevronDown className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center gap-6 pt-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-slate-900">3min</div>
                  <div className="text-xs text-slate-500">Average time</div>
                </div>
                <div className="w-px h-8 bg-slate-200"></div>
                <div className="text-center">
                  <div className="text-xl font-bold text-slate-900">100%</div>
                  <div className="text-xs text-slate-500">Compliant</div>
                </div>
                <div className="w-px h-8 bg-slate-200"></div>
                <div className="text-center">
                  <div className="text-xl font-bold text-slate-900">₹0</div>
                  <div className="text-xs text-slate-500">To start</div>
                </div>
              </div>
            </div>

            <div
              className={`relative transform transition-all duration-1200 delay-300 ${
                animatedElements.illustration
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              {/* Professional Illustration */}
              <div className="relative p-8">
                {/* Main Document Container */}
                <div className="relative bg-white rounded-2xl shadow-xl border border-slate-100 p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  {/* Document Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        Privacy Policy
                      </div>
                      <div className="text-xs text-slate-500">
                        Generated by Clausia AI
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                  </div>

                  {/* Document Content Lines */}
                  <div className="space-y-2">
                    <div className="h-2 bg-slate-200 rounded w-full"></div>
                    <div className="h-2 bg-slate-100 rounded w-4/5"></div>
                    <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-2 bg-slate-100 rounded w-5/6"></div>
                    <div className="h-2 bg-purple-100 rounded w-2/3"></div>
                  </div>

                  {/* Feature Icons */}
                  <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Lock className="w-3 h-3" />
                      Secure
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Globe className="w-3 h-3" />
                      Indian Laws
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      Real-time
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center animate-bounce delay-500">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>

                <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                  <Zap className="w-5 h-5 text-white" />
                </div>

                {/* Background Accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl -z-10 transform -rotate-6"></div>

                {/* Decorative Dots */}
                <div className="absolute top-1/4 -right-8">
                  <div className="grid grid-cols-3 gap-1">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-1 bg-purple-200 rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 100}ms` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="benefits" className="py-20 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ${
              animatedElements.features
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Why choose{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Clausia?
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Built specifically for Indian digital products. Save hours of
              legal research and avoid costly compliance mistakes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl bg-gradient-to-br from-white to-purple-50/30 border border-purple-100/50 hover:shadow-xl hover:scale-105 transition-all duration-300 transform ${
                  animatedElements.features
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              How Clausia works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Three simple steps to get your professional privacy policy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connection lines */}
            <div className="hidden md:block absolute top-20 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-purple-300 to-pink-300"></div>

            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Pricing */}
      <section
        id="pricing"
        className="py-20 px-6 bg-gradient-to-br from-slate-50 to-purple-50"
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ${
              animatedElements.pricing
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Simple, transparent{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                pricing
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose the perfect pack for your needs. Start free, upgrade
              anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricing.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 transform ${
                  animatedElements.pricing
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                } ${
                  plan.popular
                    ? "border-purple-500 bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-2xl scale-105"
                    : "border-slate-200 bg-white hover:border-purple-300 hover:shadow-xl"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-sm font-bold rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3
                    className={`text-xl font-bold mb-4 ${
                      plan.popular ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span
                      className={`text-4xl font-bold ${
                        plan.popular ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span
                        className={`text-lg ${
                          plan.popular ? "text-purple-100" : "text-slate-500"
                        }`}
                      >
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle
                        className={`w-5 h-5 flex-shrink-0 ${
                          plan.popular ? "text-white" : "text-green-500"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          plan.popular ? "text-purple-100" : "text-slate-600"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 ${
                    plan.popular
                      ? "bg-white text-purple-600 hover:shadow-lg hover:scale-105"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-105"
                  }`}
                  onClick={() => router.push(plan.actionRoute)}
                >
                  {plan.price === "₹0" ? "Start Free" : "Get Credits"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to protect your users?
          </h2>
          <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto leading-relaxed">
          Helping Indian developers publish clear, compliant privacy policies. 
          Start creating your professional policy today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/login"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-purple-600 font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Create Policy Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 hover:shadow-lg transition-all duration-200"
            >
              Learn More
            </a>
          </div>

          <div className="mt-12 text-center">
            <p className="text-purple-200 text-sm">
              ⚡ Generate your first policy in under 3 minutes
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
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
              <h5 className="font-semibold mb-4 text-white">Product</h5>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-white transition-colors"
                  >
                    How it Works
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="/login"
                    className="hover:text-white transition-colors"
                  >
                    Try Now
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-white">Legal</h5>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <a href="/legal/privacypolicy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/legal/termsofservice" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center">
            <p className="text-slate-400">
              © 2024 Clausia. Made with ❤️ for Indian developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
