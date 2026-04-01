import type { Metadata } from "next";
import ABNLookupClient from "./ABNLookupClient";

export const metadata: Metadata = {
  title: {
    absolute: "Free ABN Lookup — Validate Australian Business Numbers | InvoKit",
  },
  description:
    "Instantly validate and lookup Australian Business Numbers (ABN). Check ABN status, business name, GST registration, and entity type. Free ABN checker powered by the ABR registry.",
  keywords: [
    "ABN lookup",
    "ABN checker",
    "validate ABN",
    "ABN search",
    "Australian Business Number",
    "ABR lookup",
    "check ABN",
    "ABN validator",
    "ABN verification",
  ],
  alternates: {
    canonical: "https://invokit.net/tools/abn-lookup",
  },
  openGraph: {
    title: "Free ABN Lookup — Validate Australian Business Numbers | InvoKit",
    description: "Instantly validate any ABN. Check registration status, GST registration, business name, and entity type from the ABR registry.",
    url: "https://invokit.net/tools/abn-lookup",
  },
};

export default function ABNLookupPage() {
  return (
    <>
      <ABNLookupClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How do I look up an ABN?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Enter the 11-digit ABN into the search box above and click Lookup. The tool will validate the checksum and check it against the Australian Business Register (ABR) to return the business name, status, GST registration, and entity type.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need an ABN to send invoices in Australia?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You should include your ABN on all invoices over $75 in Australia. If you are registered for GST, you must include your ABN on tax invoices. Without an ABN, the payer may be required to withhold 47% of the payment under the no-ABN withholding rule.",
                },
              },
              {
                "@type": "Question",
                name: "What is an ABN?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "An ABN (Australian Business Number) is an 11-digit identifier issued by the Australian Business Register to businesses operating in Australia. It identifies your business to the government and community, allows you to claim GST credits, and is required on invoices.",
                },
              },
              {
                "@type": "Question",
                name: "How can I check if an ABN is valid?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A valid ABN passes a mathematical checksum test. Enter it above — this tool validates the checksum instantly and then checks the ABR database to confirm it is registered and active.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
