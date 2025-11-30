"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Logo } from "@/components/ui/logo"
import { ArrowRight, Sparkles, Shield, Zap, BarChart3, Check, ChevronRight, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

const features = [
  {
    icon: Sparkles,
    title: "Intelligent Widgets",
    description: "Drag, drop, and customize modular widgets to build your perfect dashboard.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption and row-level security to protect your data.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built on modern architecture for instant response times.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Beautiful charts and insights to track what matters most.",
  },
]

const pricingPlans = [
  {
    name: "Starter",
    price: "$0",
    description: "Perfect for trying out StriderBoard",
    features: ["5 widgets", "Basic analytics", "Email support", "1 team member"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    description: "For growing teams",
    features: ["Unlimited widgets", "Advanced analytics", "Priority support", "10 team members", "API access"],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: ["Everything in Pro", "SSO/SAML", "Dedicated support", "Unlimited team", "Custom integrations"],
    cta: "Contact Sales",
    popular: false,
  },
]

const faqs = [
  { q: "How does the free trial work?", a: "You get 14 days of full Pro features, no credit card required." },
  { q: "Can I change plans later?", a: "Yes, upgrade or downgrade anytime from your dashboard." },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards and bank transfers for Enterprise.",
  },
  { q: "Is my data secure?", a: "Absolutely. We use bank-grade encryption and are SOC 2 certified." },
]

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo width={160} height={40} showTagline={false} />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Nav */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col gap-6 mt-12">
                  <div className="flex flex-col gap-2">
                    <Link
                      href="#features"
                      className="text-base font-medium px-4 py-3 rounded-lg hover:bg-accent hover:text-primary transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Features
                    </Link>
                    <Link
                      href="#pricing"
                      className="text-base font-medium px-4 py-3 rounded-lg hover:bg-accent hover:text-primary transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Pricing
                    </Link>
                    <Link
                      href="#faq"
                      className="text-base font-medium px-4 py-3 rounded-lg hover:bg-accent hover:text-primary transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      FAQ
                    </Link>
                  </div>
                  <div className="h-px bg-border/60 mx-4" />
                  <div className="flex flex-col gap-3 px-4">
                    <Button variant="outline" asChild className="w-full justify-center">
                      <Link href="/auth/login">Sign in</Link>
                    </Button>
                    <Button asChild className="w-full justify-center">
                      <Link href="/auth/sign-up">Get Started</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Now with AI-powered insights</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance mb-6">
            Build dashboards that <span className="text-primary">scale with you</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
            The modular SaaS platform that adapts to your workflow. Drag, drop, and customize your perfect workspace in
            minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="w-full sm:w-auto hover-lift">
              <Link href="/auth/sign-up">
                Start for free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/dashboard">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-20 px-4 md:px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Everything you need to succeed</h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto px-4">Powerful features designed for modern teams</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-card rounded-2xl border border-border hover-lift hover-glow group"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Simple, transparent pricing</h2>
            <p className="text-sm md:text-base text-muted-foreground">No hidden fees. Cancel anytime.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`p-6 rounded-2xl border ${plan.popular ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border bg-card"
                  } hover-lift`}
              >
                {plan.popular && <div className="text-xs font-medium text-primary mb-4">Most Popular</div>}
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="mt-2 mb-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/mo</span>}
                </div>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                <Button className="w-full mb-6" variant={plan.popular ? "default" : "outline"}>
                  {plan.cta}
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-20 px-4 md:px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Frequently asked questions</h2>
            <p className="text-sm md:text-base text-muted-foreground">Everything you need to know</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="p-6 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors"
              >
                <h3 className="font-medium mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Ready to get started?</h2>
          <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 px-4">
            Join thousands of teams building better dashboards with StriderBoard
          </p>
          <Button size="lg" asChild className="hover-lift">
            <Link href="/auth/sign-up">
              Start your free trial
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <Logo width={160} height={40} showTagline={false} />
              <p className="text-sm text-muted-foreground mt-4 max-w-md">
                The modular SaaS platform that adapts to your workflow. Build dashboards that scale with you.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="flex flex-col gap-2.5">
                <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
                <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
                <Link href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Demo
                </Link>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="flex flex-col gap-2.5">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border mb-6" />

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground order-2 md:order-1">
              © 2025 StriderBoard. All rights reserved.
            </p>

            {/* ChronoStrider Branding */}
            <div className="flex items-center gap-2 order-1 md:order-2">
              <span className="text-sm text-muted-foreground">Designed & Developed by</span>
              <Link
                href="https://chronostrider.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 group"
              >
                <img
                  src="/chronostrider-logo.png"
                  alt="ChronoStrider"
                  className="h-12 opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
