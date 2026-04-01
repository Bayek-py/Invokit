"use client";

import { useState } from "react";
import { ArrowRight, FileText } from "lucide-react";

const VAT_PRESETS = [
  { region: "UK", label: "UK VAT Standard", rate: 20, flag: "🇬🇧" },
  { region: "UK", label: "UK VAT Reduced", rate: 5, flag: "🇬🇧" },
  { region: "EU", label: "Germany", rate: 19, flag: "🇩🇪" },
  { region: "EU", label: "France", rate: 20, flag: "🇫🇷" },
  { region: "EU", label: "Netherlands", rate: 21, flag: "🇳🇱" },
  { region: "EU", label: "Spain", rate: 21, flag: "🇪🇸" },
  { region: "EU", label: "Italy", rate: 22, flag: "🇮🇹" },
  { region: "US", label: "California", rate: 7.25, flag: "🇺🇸" },
  { region: "US", label: "New York", rate: 4, flag: "🇺🇸" },
  { region: "US", label: "Texas", rate: 6.25, flag: "🇺🇸" },
  { region: "US", label: "Florida", rate: 6, flag: "🇺🇸" },
] as const;

const REGIONS = ["UK", "EU", "US"] as const;
type Region = typeof REGIONS[number];

export default function VATCalculatorClient() {
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState(20);
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [activeRegion, setActiveRegion] = useState<Region>("UK");

  const numAmount = parseFloat(amount) || 0;
  const taxAmount = mode === "add"
    ? numAmount * (rate / 100)
    : numAmount - numAmount / (1 + rate / 100);
  const preTax = mode === "add" ? numAmount : numAmount - taxAmount;
  const total = mode === "add" ? numAmount + taxAmount : numAmount;
  const taxLabel = activeRegion === "US" ? "Sales Tax" : "VAT";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-[var(--muted-foreground)] mb-6">
        <a href="/" className="hover:text-[var(--foreground)]">Home</a>
        <span className="mx-2">/</span>
        <span className="text-[var(--foreground)]">VAT / Sales Tax Calculator</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-3">
        Free VAT & Sales Tax Calculator
      </h1>
      <p className="text-[var(--muted-foreground)] mb-8 max-w-2xl">
        Add or remove VAT for UK and EU countries, or calculate US state sales tax instantly.
      </p>

      <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-sm mb-12">
        {/* Region tabs */}
        <div className="flex bg-[var(--muted)] rounded-xl p-1 mb-6">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => {
                setActiveRegion(r);
                const first = VAT_PRESETS.find((p) => p.region === r);
                if (first) setRate(first.rate);
              }}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors ${
                activeRegion === r
                  ? "bg-[var(--brand)] text-white shadow-sm"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              {r === "UK" ? "🇬🇧 UK" : r === "EU" ? "🇪🇺 EU" : "🇺🇸 US"}
            </button>
          ))}
        </div>

        {/* Add/Remove toggle */}
        <div className="flex bg-[var(--muted)] rounded-xl p-1 mb-6">
          <button
            onClick={() => setMode("add")}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-colors ${mode === "add" ? "bg-white shadow-sm text-[var(--foreground)]" : "text-[var(--muted-foreground)]"}`}
          >
            Add {taxLabel}
          </button>
          <button
            onClick={() => setMode("remove")}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-colors ${mode === "remove" ? "bg-white shadow-sm text-[var(--foreground)]" : "text-[var(--muted-foreground)]"}`}
          >
            Remove {taxLabel}
          </button>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1.5 uppercase tracking-wide">
              {mode === "add" ? `Amount (excl. ${taxLabel})` : `Amount (incl. ${taxLabel})`}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] font-medium">
                {activeRegion === "UK" ? "£" : activeRegion === "EU" ? "€" : "$"}
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
              {taxLabel} Rate
            </label>
            <div className="relative">
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                className="w-full px-4 pr-8 py-3.5 border border-[var(--border)] rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent"
                min="0"
                max="100"
                step="0.01"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] font-medium">%</span>
            </div>
          </div>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-2 mb-8">
          {VAT_PRESETS.filter((p) => p.region === activeRegion).map((p) => (
            <button
              key={p.label}
              onClick={() => setRate(p.rate)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                rate === p.rate
                  ? "bg-[var(--brand)] text-white border-[var(--brand)]"
                  : "border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--brand)] hover:text-[var(--brand)]"
              }`}
            >
              {p.flag} {p.label} ({p.rate}%)
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="bg-[var(--muted)] rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--muted-foreground)]">Pre-tax amount</span>
            <span className="text-lg font-semibold">{preTax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--muted-foreground)]">{taxLabel} ({rate}%)</span>
            <span className="text-lg font-semibold text-[var(--brand)]">{taxAmount.toFixed(2)}</span>
          </div>
          <div className="border-t-2 border-[var(--brand)] pt-4 flex justify-between items-center">
            <span className="font-bold text-[var(--foreground)]">Total (incl. {taxLabel})</span>
            <span className="text-2xl font-bold text-[var(--brand)]">{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[var(--brand-light)] border border-blue-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[var(--brand)] text-white rounded-xl flex items-center justify-center flex-shrink-0">
            <FileText size={24} />
          </div>
          <div>
            <p className="font-bold text-[var(--foreground)]">Need to send a VAT invoice?</p>
            <p className="text-sm text-[var(--muted-foreground)]">Create a VAT-compliant invoice with tax auto-calculated. Free PDF download.</p>
          </div>
        </div>
        <a href="/invoice-generator" className="flex-shrink-0 inline-flex items-center gap-2 bg-[var(--brand)] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[var(--brand-dark)] transition-colors text-sm">
          Create Invoice <ArrowRight size={16} />
        </a>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "InvoKit VAT & Sales Tax Calculator",
        description: "Free online VAT calculator for UK and EU, plus US state sales tax calculator.",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      })}} />
    </div>
  );
}
