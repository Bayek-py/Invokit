import type { Metadata } from "next";
import {
  FileText,
  Download,
  Calculator,
  Zap,
  Globe,
  Shield,
  Receipt,
  ClipboardList,
  Search,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://invokit.com",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[var(--brand-light)] to-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-[var(--border)] rounded-full px-4 py-1.5 mb-6 text-sm text-[var(--muted-foreground)]">
            <Zap size={14} className="text-[var(--brand)]" />
            Invoices, estimates, receipts, GST &amp; tax tools — all in one
            place
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--foreground)] leading-tight">
            Free invoice generator
            <br />
            <span className="text-[var(--brand)]">&amp; business toolkit.</span>
          </h1>
          <p className="mt-6 text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Create professional invoices, estimates, and receipts in seconds.
            Built-in GST calculator, ABN lookup, and VAT tools. Free PDF
            export. No signup required.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/invoice-generator"
              className="inline-flex items-center justify-center gap-2 bg-[var(--brand)] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[var(--brand-dark)] transition-colors text-lg"
            >
              <FileText size={20} />
              Create Free Invoice
            </a>
            <a
              href="#free-tools"
              className="inline-flex items-center justify-center gap-2 border-2 border-[var(--border)] text-[var(--foreground)] font-semibold px-8 py-4 rounded-xl hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors text-lg"
            >
              <Calculator size={20} />
              Explore Free Tools
            </a>
          </div>
          <p className="mt-4 text-sm text-[var(--muted-foreground)]">
            No credit card. No signup. 100% free.
          </p>
        </div>
      </section>

      {/* Free Tools Section */}
      <section id="free-tools" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-[var(--brand-light)] text-[var(--brand)] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              Free forever
            </span>
            <h2 className="text-3xl font-bold text-[var(--foreground)]">
              Every tool your business needs
            </h2>
            <p className="mt-3 text-[var(--muted-foreground)] max-w-xl mx-auto">
              Stop switching between apps. InvoKit gives you invoicing, tax
              calculators, and compliance tools — all under one roof.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolCard
              icon={<FileText size={22} />}
              title="Invoice Generator"
              description="Create professional invoices with live preview and instant PDF download."
              href="/invoice-generator"
              badge="Most Popular"
            />
            <ToolCard
              icon={<Calculator size={22} />}
              title="GST Calculator"
              description="Calculate GST-inclusive and exclusive amounts instantly. AU, NZ, India, Singapore."
              href="/tools/gst-calculator"
              badge="Free Tool"
            />
            <ToolCard
              icon={<Search size={22} />}
              title="ABN Lookup"
              description="Validate Australian Business Numbers instantly via the ABR registry."
              href="/tools/abn-lookup"
              badge="Free Tool"
            />
            <ToolCard
              icon={<ClipboardList size={22} />}
              title="Estimate Generator"
              description="Send professional quotes and estimates. Convert to invoice in one click."
              href="/estimate-generator"
              badge="Free Tool"
            />
            <ToolCard
              icon={<Receipt size={22} />}
              title="Receipt Generator"
              description="Create payment receipts for completed transactions."
              href="/receipt-generator"
              badge="Free Tool"
            />
            <ToolCard
              icon={<Globe size={22} />}
              title="VAT / Sales Tax Calculator"
              description="Calculate VAT for EU/UK or sales tax for US states."
              href="/tools/vat-calculator"
              badge="Free Tool"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[var(--foreground)] mb-12">
            Why businesses choose InvoKit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FileText size={24} />}
              title="Professional Templates"
              description="Choose from multiple invoice designs. Clean, modern, and ready for any industry."
            />
            <FeatureCard
              icon={<Download size={24} />}
              title="Instant PDF Export"
              description="Download your invoice as a high-quality PDF with one click. Print or email it."
            />
            <FeatureCard
              icon={<Calculator size={24} />}
              title="Built-in Tax Tools"
              description="GST calculator, VAT tools, and sales tax — all integrated. No more tab-switching."
            />
            <FeatureCard
              icon={<Globe size={24} />}
              title="Multi-Currency"
              description="Invoice in USD, AUD, EUR, GBP, INR, and more. Works for clients anywhere."
            />
            <FeatureCard
              icon={<Zap size={24} />}
              title="No Signup Required"
              description="Start creating invoices immediately. No account, no email, no friction."
            />
            <FeatureCard
              icon={<Shield size={24} />}
              title="Your Data Stays Private"
              description="Everything runs in your browser. We never store your invoice data on our servers."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[var(--foreground)] mb-12">
            Create an invoice in 60 seconds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Step
              number={1}
              title="Enter Details"
              description="Add your business info, client details, and line items."
            />
            <Step
              number={2}
              title="Preview Invoice"
              description="See a live preview of your invoice as you type."
            />
            <Step
              number={3}
              title="Download PDF"
              description="One click to download a professional PDF invoice."
            />
          </div>
          <div className="text-center mt-12">
            <a
              href="/invoice-generator"
              className="inline-flex items-center gap-2 bg-[var(--brand)] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[var(--brand-dark)] transition-colors"
            >
              Start Now — It&apos;s Free
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[var(--foreground)] mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <FAQ
              q="Is InvoKit really free?"
              a="Yes! You can create and download unlimited invoices for free. Free invoices include a small 'Made with InvoKit' watermark. Upgrade to Pro to remove it."
            />
            <FAQ
              q="What tools are included?"
              a="InvoKit includes an invoice generator, GST calculator, ABN lookup, estimate generator, receipt maker, and more tax tools — all free, all in one place."
            />
            <FAQ
              q="Do I need to create an account?"
              a="No. You can create and download invoices instantly without signing up. Create an account only if you want to save invoices and client details."
            />
            <FAQ
              q="Is my data secure?"
              a="Your invoice data never leaves your browser. PDF generation happens client-side. We don't store any of your business or client information."
            />
            <FAQ
              q="What tax types are supported?"
              a="InvoKit supports GST (Australia/NZ), VAT (EU/UK), US sales tax, and custom tax rates. You can toggle between tax-inclusive and tax-exclusive."
            />
            <FAQ
              q="Can I use this for my business?"
              a="Absolutely. InvoKit invoices are professionally formatted and suitable for freelancers, small businesses, contractors, and enterprises."
            />
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "InvoKit",
            description:
              "Free all-in-one invoicing toolkit. Invoice generator, GST calculator, ABN lookup, estimates, receipts, and tax tools.",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is InvoKit really free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes! You can create and download unlimited invoices for free.",
                },
              },
              {
                "@type": "Question",
                name: "What tools are included?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "InvoKit includes an invoice generator, GST calculator, ABN lookup, estimate generator, receipt maker, and more tax tools — all free.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need to create an account?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. You can create and download invoices instantly without signing up.",
                },
              },
              {
                "@type": "Question",
                name: "Is my data secure?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Your invoice data never leaves your browser. PDF generation happens client-side.",
                },
              },
              {
                "@type": "Question",
                name: "What tax types are supported?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "InvoKit supports GST, VAT, US sales tax, and custom tax rates with tax-inclusive and tax-exclusive modes.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}

function ToolCard({
  icon,
  title,
  description,
  href,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  badge?: string;
}) {
  const isComingSoon = badge === "Coming Soon";
  return (
    <a
      href={isComingSoon ? undefined : href}
      className={`group block p-6 rounded-xl border bg-white transition-all ${
        isComingSoon
          ? "border-[var(--border)] opacity-75 cursor-default"
          : "border-[var(--border)] hover:border-[var(--brand)] hover:shadow-md cursor-pointer"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-[var(--brand-light)] text-[var(--brand)] rounded-lg flex items-center justify-center">
          {icon}
        </div>
        {badge && (
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
              badge === "Most Popular"
                ? "bg-[var(--brand)] text-white"
                : badge === "Free Tool"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {badge}
          </span>
        )}
      </div>
      <h3 className="font-semibold text-[var(--foreground)] mb-1 flex items-center gap-2">
        {title}
        {!isComingSoon && (
          <ArrowRight
            size={14}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--brand)]"
          />
        )}
      </h3>
      <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
    </a>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-xl border border-[var(--border)] bg-white hover:border-[var(--brand)] hover:shadow-sm transition-all">
      <div className="w-12 h-12 bg-[var(--brand-light)] text-[var(--brand)] rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-[var(--foreground)] mb-2">{title}</h3>
      <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="w-14 h-14 bg-[var(--brand)] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="font-semibold text-[var(--foreground)] mb-2">{title}</h3>
      <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div className="border border-[var(--border)] rounded-xl p-5 bg-white">
      <h3 className="font-semibold text-[var(--foreground)] mb-2">{q}</h3>
      <p className="text-sm text-[var(--muted-foreground)]">{a}</p>
    </div>
  );
}
