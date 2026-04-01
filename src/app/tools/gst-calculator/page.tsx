import type { Metadata } from "next";
import GSTCalculatorClient from "./GSTCalculatorClient";

export const metadata: Metadata = {
  title: {
    absolute: "Free GST Calculator — Add or Remove GST Instantly | InvoKit",
  },
  description:
    "Free online GST calculator. Add or remove GST from any amount instantly. Supports Australian GST (10%), NZ GST (15%), Indian GST (5-28%), and Singapore GST (9%). Part of InvoKit's free invoicing toolkit.",
  keywords: [
    "GST calculator",
    "GST calculator Australia",
    "add GST",
    "remove GST",
    "GST inclusive",
    "GST exclusive",
    "free GST calculator",
    "GST calculator online",
    "calculate GST",
  ],
  alternates: {
    canonical: "https://invokit.net/tools/gst-calculator",
  },
  openGraph: {
    title: "Free GST Calculator — Add or Remove GST Instantly | InvoKit",
    description: "Add or remove GST from any amount. Supports AU (10%), NZ (15%), Singapore (9%), and Indian GST rates. Free, instant, no signup.",
    url: "https://invokit.net/tools/gst-calculator",
  },
};

export default function GSTCalculatorPage() {
  return (
    <>
      <GSTCalculatorClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How do I calculate GST in Australia?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "To add GST in Australia, multiply the price by 0.10 (10%). For example, $100 + 10% GST = $110. To find GST in a GST-inclusive price, divide by 11. For example, $110 / 11 = $10 GST, and $100 pre-tax.",
                },
              },
              {
                "@type": "Question",
                name: "What is the GST rate in Australia?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The GST rate in Australia is 10%. It applies to most goods and services sold or consumed in Australia. Businesses with a turnover of $75,000 or more must register for GST.",
                },
              },
              {
                "@type": "Question",
                name: "How do I remove GST from a total amount?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "To remove GST from a GST-inclusive amount, divide by 1.10 (for 10% GST). For example: $110 ÷ 1.10 = $100 pre-tax. The GST component is $110 - $100 = $10.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between GST-inclusive and GST-exclusive?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A GST-exclusive price does not include GST — you need to add GST on top. A GST-inclusive price already includes GST in the total shown. Tax invoices in Australia must show the total price including GST.",
                },
              },
              {
                "@type": "Question",
                name: "What is the GST rate in New Zealand?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The GST rate in New Zealand is 15%. It applies to most goods and services. To add NZ GST, multiply by 0.15. To remove GST from an inclusive price, divide by 1.15.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
