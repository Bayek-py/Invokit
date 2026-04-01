"use client";

import { InvoiceProvider } from "@/context/InvoiceContext";
import InvoiceEditor from "@/components/InvoiceEditor";
import EstimatePreview from "./EstimatePreview";
import EstimateDownloadButton from "./EstimateDownloadButton";

export default function EstimateGeneratorClient() {
  return (
    <InvoiceProvider>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            ESTIMATE / QUOTE
          </div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            Free Estimate Generator
          </h1>
          <p className="text-[var(--muted-foreground)] mt-2">
            Create professional estimates and quotes. Fill in the details below and download as PDF. No signup required.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <InvoiceEditor />
          </div>
          <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
            <EstimateDownloadButton />
            <EstimatePreview />
          </div>
        </div>

        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">What is a Business Estimate?</h2>
          <p className="text-[var(--muted-foreground)]">
            A business estimate (also called a quote or quotation) is a document you send to a potential client outlining the cost of work before it begins. Unlike an invoice, an estimate is not a request for payment — it&apos;s an offer. Once the client approves it, you can convert it to an invoice.
          </p>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "InvoKit Estimate Generator",
        description: "Free online estimate and quote generator with PDF export.",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      })}} />
    </InvoiceProvider>
  );
}
