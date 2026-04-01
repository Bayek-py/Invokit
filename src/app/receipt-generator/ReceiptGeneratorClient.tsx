"use client";

import { InvoiceProvider } from "@/context/InvoiceContext";
import InvoiceEditor from "@/components/InvoiceEditor";
import ReceiptPreview from "./ReceiptPreview";
import ReceiptDownloadButton from "./ReceiptDownloadButton";

export default function ReceiptGeneratorClient() {
  return (
    <InvoiceProvider>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            PAYMENT RECEIPT
          </div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            Free Receipt Generator
          </h1>
          <p className="text-[var(--muted-foreground)] mt-2">
            Create professional payment receipts. Fill in the details and download as PDF. No signup required.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <InvoiceEditor />
          </div>
          <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
            <ReceiptDownloadButton />
            <ReceiptPreview />
          </div>
        </div>

        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">Invoice vs Receipt — What&apos;s the Difference?</h2>
          <p className="text-[var(--muted-foreground)]">
            An <strong>invoice</strong> is sent before payment — it&apos;s a request for money. A <strong>receipt</strong> is issued after payment — it&apos;s proof that money was received. Both are important for your accounting records and for your client&apos;s expense tracking.
          </p>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "InvoKit Receipt Generator",
        description: "Free online payment receipt generator with PDF export.",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      })}} />
    </InvoiceProvider>
  );
}
