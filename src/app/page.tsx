"use client";
import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Zap, Shield, Clock, Star, Menu, X, ChevronDown } from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [animatedElements, setAnimatedElements] = useState({
    hero: false,
    features: false,
    pricing: false
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Trigger animations based on scroll position
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      setAnimatedElements(prev => ({
        hero: true, // Hero animates immediately
        features: scrollY > windowHeight * 0.2,
        pricing: scrollY > windowHeight * 0.8
      }));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Generate professional policies in under 3 minutes"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "India-Compliant",
      description: "Tailored specifically for Indian digital products"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Always Updated",
      description: "Policies stay current with latest regulations"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Answer Simple Questions",
      description: "Tell us about your app, website, or game in plain language"
    },
    {
      number: "02", 
      title: "AI Magic Happens",
      description: "Our advanced engine crafts a compliant policy instantly"
    },
    {
      number: "03",
      title: "Deploy & Share",
      description: "Get your policy as text or a live, shareable link"
    }
  ];

  const pricing = [
    {
      name: "Free Starter",
      price: "₹0",
      period: "",
      features: ["10 free credits", "Basic policy generation", "Text output", "Community support"],
      popular: false,
      color: "from-slate-50 to-slate-100"
    },
    {
      name: "Pro Creator",
      price: "₹199",
      period: "",
      features: ["50 premium credits", "Advanced AI engine", "Live link hosting", "Priority support", "Custom branding"],
      popular: true,
      color: "from-purple-600 to-pink-600"
    },
    {
      name: "Business Elite",
      price: "₹499", 
      period: "",
      features: ["200 elite credits", "Premium priority engine", "White-label options", "Legal review assistance", "24/7 priority support"],
      popular: false,
      color: "from-slate-800 to-slate-900"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 text-slate-900 overflow-x-hidden">
      {/* Enhanced Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent" style={{fontFamily:"chillax"}}>
            Clausia
          </a>
          
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-700">
            <a href="#how-it-works" className="hover:text-purple-600 transition-colors relative group">
              How it works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="#benefits" className="hover:text-purple-600 transition-colors relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="#pricing" className="hover:text-purple-600 transition-colors relative group">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
            </a>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href="/login" className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-purple-600 transition-colors">
              Sign in
            </a>
            <a href="/dashboard" className="group px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-sm hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-white/95 backdrop-blur-md border-t border-white/20`}>
          <div className="px-6 py-4 space-y-4">
            <a href="#how-it-works" className="block py-2 text-slate-700 hover:text-purple-600 transition-colors">How it works</a>
            <a href="#benefits" className="block py-2 text-slate-700 hover:text-purple-600 transition-colors">Features</a>
            <a href="#pricing" className="block py-2 text-slate-700 hover:text-purple-600 transition-colors">Pricing</a>
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <a href="/login" className="block py-2 text-slate-700 hover:text-purple-600 transition-colors">Sign in</a>
              <a href="/form" className="block px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-center">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-12 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-12 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-conic from-purple-200/10 via-transparent to-pink-200/10 rounded-full blur-2xl animate-spin" style={{animationDuration: '20s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`space-y-8 transform transition-all duration-1000 ${animatedElements.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                <Star className="w-4 h-4 fill-current" />
                Built with feedback from Indian founders
              </div>
              
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                Generate{' '}
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 bg-clip-text text-transparent">
                  AI-powered
                </span>{' '}
                privacy policies{' '}
                <span className="relative">
                  instantly
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-purple-300" viewBox="0 0 300 12" fill="none">
                    <path d="M0 6 Q 150 12 300 6" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                Stop spending hours on legal research. Clausia creates professional, compliant privacy policies for Indian apps, games, and websites in minutes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/form" className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
                  Start Creating Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#how-it-works" className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border-2 border-slate-200 text-slate-700 font-semibold text-lg hover:border-purple-300 hover:text-purple-600 hover:shadow-lg transition-all duration-200">
                  See How It Works
                  <ChevronDown className="w-5 h-5" />
                </a>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">3min</div>
                  <div className="text-sm text-slate-600">Average time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">100%</div>
                  <div className="text-sm text-slate-600">Compliant</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">₹0</div>
                  <div className="text-sm text-slate-600">To start</div>
                </div>
              </div>
            </div>

            <div className={`relative transform transition-all duration-1000 delay-300 ${animatedElements.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative">
                {/* Placeholder for hero image - using decorative elements instead */}
                <div className="w-full max-w-lg mx-auto aspect-square relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl transform rotate-6 shadow-xl"></div>
                  <div className="absolute inset-4 bg-white rounded-2xl shadow-2xl flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="text-center p-8">
                      <Shield className="w-20 h-20 text-purple-600 mx-auto mb-4" />
                      <div className="text-lg font-semibold text-slate-800 mb-2">Privacy Policy</div>
                      <div className="text-sm text-slate-600">Generated in seconds</div>
                      <div className="mt-6 space-y-2">
                        <div className="h-2 bg-slate-200 rounded"></div>
                        <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-2 bg-slate-200 rounded w-1/2"></div>
                      </div>
                    </div>
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
          <div className={`text-center mb-16 transform transition-all duration-1000 ${animatedElements.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Why choose{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Clausia?
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Built specifically for Indian digital products. Save hours of legal research and avoid costly compliance mistakes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl bg-gradient-to-br from-white to-purple-50/30 border border-purple-100/50 hover:shadow-xl hover:scale-105 transition-all duration-300 transform ${
                  animatedElements.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">How Clausia works</h2>
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
                <p className="text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Pricing */}
      <section id="pricing" className="py-20 px-6 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${animatedElements.pricing ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Simple, transparent{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                pricing
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose the perfect plan for your needs. Start free, upgrade anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricing.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 transform ${
                  animatedElements.pricing ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                } ${
                  plan.popular
                    ? 'border-purple-500 bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-2xl scale-105'
                    : 'border-slate-200 bg-white hover:border-purple-300 hover:shadow-xl'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-sm font-bold rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className={`text-xl font-bold mb-4 ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className={`text-lg ${plan.popular ? 'text-purple-100' : 'text-slate-500'}`}>
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-green-500'}`} />
                      <span className={`text-sm ${plan.popular ? 'text-purple-100' : 'text-slate-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-white text-purple-600 hover:shadow-lg hover:scale-105'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {plan.price === '₹0' ? 'Start Free' : 'Get Credits'}
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
            Join thousands of Indian developers who trust Clausia for their privacy policy needs. Start creating your professional policy today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="/login" className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-purple-600 font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
              Create Policy Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#how-it-works" className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 hover:shadow-lg transition-all duration-200">
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
              <h4 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4" style={{fontFamily:"chillax"}}>
                Clausia
              </h4>
              <p className="text-slate-400 mb-6 max-w-md leading-relaxed">
                The fastest way for Indian developers to generate professional, compliant privacy policies. Built by developers, for developers.
              </p>
              <div className="space-y-2">
                <p className="text-slate-400">
                  Support: <a href="mailto:support@clausia.app" className="text-purple-400 hover:text-purple-300 transition-colors">support@clausia.app</a>
                </p>
              </div>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-white">Product</h5>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="/form" className="hover:text-white transition-colors">Try Now</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-white">Legal</h5>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
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