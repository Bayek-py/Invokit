"use client";

import { InvoiceProvider } from "@/context/InvoiceContext";
import InvoiceEditor from "@/components/InvoiceEditor";
import InvoicePreview from "@/components/InvoicePreview";
import DownloadButton from "@/components/DownloadButton";

export default function InvoiceGeneratorClient() {
  return (
    <InvoiceProvider>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            Free Invoice Generator
          </h1>
          <p className="text-[var(--muted-foreground)] mt-2">
            Fill in the details below and download your professional invoice as
            a PDF. No signup required.
          </p>
        </div>

        {/* Two-column layout: editor + preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Editor */}
          <div>
            <InvoiceEditor />
          </div>

          {/* Right: Preview + Download */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
            <DownloadButton />
            <InvoicePreview />
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            How to Create an Invoice
          </h2>
          <ol className="space-y-3 text-[var(--muted-foreground)]">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-[var(--brand-light)] text-[var(--brand)] rounded-full flex items-center justify-center text-sm font-bold">
                1
              </span>
              <span>
                <strong className="text-[var(--foreground)]">
                  Add your business details
                </strong>{" "}
                — Enter your company name, address, and tax ID.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-[var(--brand-light)] text-[var(--brand)] rounded-full flex items-center justify-center text-sm font-bold">
                2
              </span>
              <span>
                <strong className="text-[var(--foreground)]">
                  Add your client&apos;s info
                </strong>{" "}
                — Who are you billing? Enter their name and address.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-[var(--brand-light)] text-[var(--brand)] rounded-full flex items-center justify-center text-sm font-bold">
                3
              </span>
              <span>
                <strong className="text-[var(--foreground)]">
                  Add line items
                </strong>{" "}
                — Describe each product or service, quantity, and rate.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-[var(--brand-light)] text-[var(--brand)] rounded-full flex items-center justify-center text-sm font-bold">
                4
              </span>
              <span>
                <strong className="text-[var(--foreground)]">
                  Download PDF
                </strong>{" "}
                — Click the download button to get your invoice as a
                professional PDF.
              </span>
            </li>
          </ol>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "InvoKit Invoice Generator",
            description:
              "Free online invoice generator with PDF export, tax calculation, and customizable templates.",
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
            "@type": "HowTo",
            name: "How to Create an Invoice",
            description:
              "Create a professional invoice in 4 easy steps using InvoKit.",
            step: [
              {
                "@type": "HowToStep",
                name: "Add your business details",
                text: "Enter your company name, address, and tax ID.",
              },
              {
                "@type": "HowToStep",
                name: "Add your client's info",
                text: "Enter the client name and address you are billing.",
              },
              {
                "@type": "HowToStep",
                name: "Add line items",
                text: "Describe each product or service, quantity, and rate.",
              },
              {
                "@type": "HowToStep",
                name: "Download PDF",
                text: "Click the download button to get your professional PDF invoice.",
              },
            ],
          }),
        }}
      />
    </InvoiceProvider>
  );
}
