"use client";

import { useState } from "react";
import { ArrowRight, FileText } from "lucide-react";

const GST_PRESETS = [
  { country: "Australia", rate: 10, flag: "AU" },
  { country: "New Zealand", rate: 15, flag: "NZ" },
  { country: "Singapore", rate: 9, flag: "SG" },
  { country: "India (5%)", rate: 5, flag: "IN" },
  { country: "India (12%)", rate: 12, flag: "IN" },
  { country: "India (18%)", rate: 18, flag: "IN" },
  { country: "India (28%)", rate: 28, flag: "IN" },
] as const;

export default function GSTCalculatorClient() {
  const [amount, setAmount] = useState<string>("100");
  const [gstRate, setGstRate] = useState<number>(10);
  const [mode, setMode] = useState<"add" | "remove">("add");

  const numAmount = parseFloat(amount) || 0;

  let gstAmount: number;
  let totalAmount: number;
  let preTaxAmount: number;

  if (mode === "add") {
    gstAmount = numAmount * (gstRate / 100);
    preTaxAmount = numAmount;
    totalAmount = numAmount + gstAmount;
  } else {
    gstAmount = numAmount - numAmount / (1 + gstRate / 100);
    preTaxAmount = numAmount - gstAmount;
    totalAmount = numAmount;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-[var(--muted-foreground)] mb-6">
        <a href="/" className="hover:text-[var(--foreground)]">
          Home
        </a>
        <span className="mx-2">/</span>
        <a href="/tools/gst-calculator" className="hover:text-[var(--foreground)]">
          Tools
        </a>
        <span className="mx-2">/</span>
        <span className="text-[var(--foreground)]">GST Calculator</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-3">
        Free GST Calculator
      </h1>
      <p className="text-[var(--muted-foreground)] mb-8 max-w-2xl">
        Add or remove GST from any amount instantly. Supports Australian,
        New Zealand, Singapore, and Indian GST rates.
      </p>

      {/* Calculator Card */}
      <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-sm mb-12">
        {/* Mode Toggle */}
        <div className="flex bg-[var(--muted)] rounded-xl p-1 mb-6">
          <button
            onClick={() => setMode("add")}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-colors ${
              mode === "add"
                ? "bg-[var(--brand)] text-white shadow-sm"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            Add GST
          </button>
          <button
            onClick={() => setMode("remove")}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-colors ${
              mode === "remove"
                ? "bg-[var(--brand)] text-white shadow-sm"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            Remove GST
          </button>
        </div>

        {/* Input Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1.5 uppercase tracking-wide">
              {mode === "add"
                ? "Amount (excl. GST)"
                : "Amount (incl. GST)"}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] font-medium">
                $
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3.5 border border-[var(--border)] rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1.5 uppercase tracking-wide">
              GST Rate
            </label>
            <div className="relative">
              <input
                type="number"
                value={gstRate}
                onChange={(e) =>
                  setGstRate(parseFloat(e.target.value) || 0)
                }
                className="w-full px-4 py-3.5 border border-[var(--border)] rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent pr-8"
                min="0"
                max="100"
                step="0.1"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] font-medium">
                %
              </span>
            </div>
          </div>
        </div>

        {/* Quick Rate Presets */}
        <div className="flex flex-wrap gap-2 mb-8">
          {GST_PRESETS.map((preset) => (
            <button
              key={`${preset.country}-${preset.rate}`}
              onClick={() => setGstRate(preset.rate)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                gstRate === preset.rate
                  ? "bg-[var(--brand)] text-white border-[var(--brand)]"
                  : "border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--brand)] hover:text-[var(--brand)]"
              }`}
            >
              {preset.flag} {preset.country} ({preset.rate}%)
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="bg-[var(--muted)] rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--muted-foreground)]">
              Pre-tax amount
            </span>
            <span className="text-lg font-semibold text-[var(--foreground)]">
              ${preTaxAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--muted-foreground)]">
              GST ({gstRate}%)
            </span>
            <span className="text-lg font-semibold text-[var(--brand)]">
              ${gstAmount.toFixed(2)}
            </span>
          </div>
          <div className="border-t-2 border-[var(--brand)] pt-4 flex justify-between items-center">
            <span className="text-base font-bold text-[var(--foreground)]">
              Total (incl. GST)
            </span>
            <span className="text-2xl font-bold text-[var(--brand)]">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-[var(--brand-light)] border border-blue-200 rounded-2xl p-6 sm:p-8 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[var(--brand)] text-white rounded-xl flex items-center justify-center flex-shrink-0">
            <FileText size={24} />
          </div>
          <div>
            <h3 className="font-bold text-[var(--foreground)]">
              Need to send a GST invoice?
            </h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              Create a tax-compliant invoice with GST auto-calculated. Free PDF
              download.
            </p>
          </div>
        </div>
        <a
          href="/invoice-generator"
          className="flex-shrink-0 inline-flex items-center gap-2 bg-[var(--brand)] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[var(--brand-dark)] transition-colors text-sm"
        >
          Create Invoice
          <ArrowRight size={16} />
        </a>
      </div>

      {/* SEO Content */}
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
          How to Calculate GST
        </h2>
        <div className="space-y-4 text-[var(--muted-foreground)]">
          <p>
            GST (Goods and Services Tax) is a consumption tax added to the price
            of goods and services. The calculation depends on whether you need to
            add GST to a base price or extract GST from a total amount.
          </p>
          <h3 className="text-lg font-semibold text-[var(--foreground)]">
            Adding GST to an amount
          </h3>
          <p>
            To add GST, multiply the original amount by the GST rate. For
            Australian GST at 10%: <strong>GST = Amount x 0.10</strong>. The
            total is the original amount plus the GST.
          </p>
          <h3 className="text-lg font-semibold text-[var(--foreground)]">
            Removing GST from an amount
          </h3>
          <p>
            To find the pre-GST amount from a GST-inclusive price, divide by (1
            + GST rate). For 10% GST:{" "}
            <strong>Pre-tax = Total / 1.10</strong>. The GST component is the
            total minus the pre-tax amount.
          </p>
          <h3 className="text-lg font-semibold text-[var(--foreground)]">
            GST Rates by Country
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Australia:</strong> 10% GST on most goods and services
            </li>
            <li>
              <strong>New Zealand:</strong> 15% GST
            </li>
            <li>
              <strong>Singapore:</strong> 9% GST (increased from 8% in 2024)
            </li>
            <li>
              <strong>India:</strong> 5%, 12%, 18%, or 28% depending on the
              category
            </li>
          </ul>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "InvoKit GST Calculator",
            description:
              "Free online GST calculator. Add or remove GST from any amount. Supports Australia, NZ, Singapore, and India rates.",
            applicationCategory: "FinanceApplication",
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
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://invokit.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Tools",
                item: "https://invokit.com/tools",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "GST Calculator",
                item: "https://invokit.com/tools/gst-calculator",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
