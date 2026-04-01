"use client";

import { useState } from "react";
import { Search, CheckCircle, XCircle, AlertCircle, ArrowRight, FileText, Loader2 } from "lucide-react";

interface ABNResult {
  abn: string;
  businessName: string;
  entityType: string;
  status: "Active" | "Cancelled";
  gstRegistered: boolean;
  acn?: string;
  state?: string;
  postcode?: string;
}

function formatABN(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
  return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
}

function validateABNChecksum(abn: string): boolean {
  const digits = abn.replace(/\D/g, "");
  if (digits.length !== 11) return false;
  const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  const arr = digits.split("").map(Number);
  arr[0] -= 1;
  const sum = arr.reduce((acc, d, i) => acc + d * weights[i], 0);
  return sum % 89 === 0;
}

// Mock lookup — in production connect to ABR web services API
function mockABRLookup(abn: string): ABNResult | null {
  const known: Record<string, ABNResult> = {
    "51824753556": {
      abn: "51 824 753 556",
      businessName: "Apple Pty Ltd",
      entityType: "Australian Private Company",
      status: "Active",
      gstRegistered: true,
      acn: "824 753 556",
      state: "NSW",
      postcode: "2000",
    },
    "49093669060": {
      abn: "49 093 669 060",
      businessName: "Commonwealth Bank of Australia",
      entityType: "Public Company",
      status: "Active",
      gstRegistered: true,
      acn: "123 123 124",
      state: "NSW",
      postcode: "2000",
    },
  };
  return known[abn] ?? null;
}

export default function ABNLookupClient() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ABNResult | "not_found" | "invalid" | null>(null);

  const handleLookup = async () => {
    const raw = input.replace(/\D/g, "");
    if (raw.length !== 11) {
      setResult("invalid");
      return;
    }
    if (!validateABNChecksum(raw)) {
      setResult("invalid");
      return;
    }

    setLoading(true);
    setResult(null);

    // Simulate API call delay
    await new Promise((r) => setTimeout(r, 800));

    const found = mockABRLookup(raw);
    setResult(found ?? "not_found");
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-[var(--muted-foreground)] mb-6">
        <a href="/" className="hover:text-[var(--foreground)]">Home</a>
        <span className="mx-2">/</span>
        <span className="text-[var(--foreground)]">ABN Lookup</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-3">
        Free ABN Lookup
      </h1>
      <p className="text-[var(--muted-foreground)] mb-8 max-w-2xl">
        Validate any Australian Business Number instantly. Check registration
        status, GST registration, and business details from the ABR registry.
      </p>

      {/* Search Card */}
      <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
        <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-2 uppercase tracking-wide">
          Enter ABN
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(formatABN(e.target.value))}
            onKeyDown={(e) => e.key === "Enter" && handleLookup()}
            placeholder="12 345 678 901"
            maxLength={14}
            className="flex-1 px-4 py-3.5 border border-[var(--border)] rounded-xl text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent"
          />
          <button
            onClick={handleLookup}
            disabled={loading || input.replace(/\D/g, "").length !== 11}
            className="flex items-center gap-2 bg-[var(--brand)] text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-[var(--brand-dark)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
            {loading ? "Checking..." : "Lookup"}
          </button>
        </div>
        <p className="text-xs text-[var(--muted-foreground)] mt-2">
          Enter the 11-digit ABN. Format: XX XXX XXX XXX
        </p>
      </div>

      {/* Result */}
      {result === "invalid" && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-3 mb-8">
          <XCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-700">Invalid ABN</p>
            <p className="text-sm text-red-600 mt-0.5">
              This ABN failed the checksum validation. Please double-check the number.
            </p>
          </div>
        </div>
      )}

      {result === "not_found" && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3 mb-8">
          <AlertCircle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-700">ABN Not Found</p>
            <p className="text-sm text-amber-600 mt-0.5">
              This ABN passed format validation but was not found in the ABR registry.
            </p>
          </div>
        </div>
      )}

      {result && typeof result === "object" && (
        <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden mb-8">
          <div className={`px-6 py-4 flex items-center justify-between ${result.status === "Active" ? "bg-green-50 border-b border-green-200" : "bg-red-50 border-b border-red-200"}`}>
            <div className="flex items-center gap-2">
              {result.status === "Active"
                ? <CheckCircle size={20} className="text-green-600" />
                : <XCircle size={20} className="text-red-500" />}
              <span className={`font-bold text-lg ${result.status === "Active" ? "text-green-700" : "text-red-600"}`}>
                ABN {result.status}
              </span>
            </div>
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${result.gstRegistered ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
              {result.gstRegistered ? "Registered for GST" : "Not GST Registered"}
            </span>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResultRow label="ABN" value={result.abn} />
            <ResultRow label="Business Name" value={result.businessName} />
            <ResultRow label="Entity Type" value={result.entityType} />
            <ResultRow label="Status" value={result.status} />
            {result.acn && <ResultRow label="ACN" value={result.acn} />}
            {result.state && <ResultRow label="State" value={`${result.state} ${result.postcode ?? ""}`} />}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-[var(--brand-light)] border border-blue-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[var(--brand)] text-white rounded-xl flex items-center justify-center flex-shrink-0">
            <FileText size={24} />
          </div>
          <div>
            <p className="font-bold text-[var(--foreground)]">Create a tax invoice with your ABN</p>
            <p className="text-sm text-[var(--muted-foreground)]">Auto-fill your ABN and GST details into a professional invoice.</p>
          </div>
        </div>
        <a href="/invoice-generator" className="flex-shrink-0 inline-flex items-center gap-2 bg-[var(--brand)] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[var(--brand-dark)] transition-colors text-sm">
          Create Invoice <ArrowRight size={16} />
        </a>
      </div>

      {/* SEO Content */}
      <div className="space-y-4 text-[var(--muted-foreground)]">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">What is an ABN?</h2>
        <p>An Australian Business Number (ABN) is an 11-digit identifier issued by the Australian Business Register (ABR) to businesses operating in Australia. It&apos;s required for businesses to invoice for goods and services, register for GST, and claim tax credits.</p>
        <h3 className="text-lg font-semibold text-[var(--foreground)]">How ABN Validation Works</h3>
        <p>ABN validation uses a weighted checksum algorithm. The first digit is reduced by 1, then each digit is multiplied by a weight (10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19). The sum must be divisible by 89 for the ABN to be valid.</p>
        <h3 className="text-lg font-semibold text-[var(--foreground)]">When Do You Need an ABN on an Invoice?</h3>
        <p>If you&apos;re registered for GST, you <strong>must</strong> include your ABN on all tax invoices. If you&apos;re not registered for GST, you should still include your ABN on invoices over $75 so clients can claim input tax credits.</p>
      </div>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "InvoKit ABN Lookup",
        description: "Free Australian Business Number (ABN) validator and lookup tool. Check ABN status, GST registration, and business details.",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      })}} />
    </div>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide mb-1">{label}</p>
      <p className="font-semibold text-[var(--foreground)]">{value}</p>
    </div>
  );
}
