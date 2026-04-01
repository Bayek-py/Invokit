import type { Metadata } from "next";
import EstimateGeneratorClient from "./EstimateGeneratorClient";

export const metadata: Metadata = {
  title: {
    absolute: "Free Estimate Generator — Create Professional Quotes | InvoKit",
  },
  description:
    "Create professional estimates and quotes in seconds. Free PDF export, customizable templates, and one-click conversion to invoice. No signup required.",
  keywords: [
    "estimate generator",
    "quote generator",
    "free estimate template",
    "business estimate",
    "quote maker",
    "estimate maker",
    "free quote maker",
    "business quote template",
  ],
  alternates: {
    canonical: "https://invokit.net/estimate-generator",
  },
  openGraph: {
    title: "Free Estimate Generator — Create Professional Quotes | InvoKit",
    description: "Create professional estimates and quotes in seconds. Free PDF export, no signup required.",
    url: "https://invokit.net/estimate-generator",
  },
};

export default function EstimateGeneratorPage() {
  return <EstimateGeneratorClient />;
}
