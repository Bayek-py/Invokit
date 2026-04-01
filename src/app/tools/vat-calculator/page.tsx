import type { Metadata } from "next";
import VATCalculatorClient from "./VATCalculatorClient";

export const metadata: Metadata = {
  title: {
    absolute: "Free VAT & Sales Tax Calculator — Add or Remove Tax | InvoKit",
  },
  description:
    "Free online VAT calculator for UK and EU, plus US sales tax calculator. Add or remove VAT/tax from any amount instantly. Supports UK (20%), EU rates, and all US state sales tax rates.",
  keywords: [
    "VAT calculator",
    "sales tax calculator",
    "UK VAT calculator",
    "EU VAT calculator",
    "US sales tax calculator",
    "add VAT",
    "remove VAT",
    "VAT calculator online",
    "reverse VAT calculator",
  ],
  alternates: {
    canonical: "https://invokit.com/tools/vat-calculator",
  },
  openGraph: {
    title: "Free VAT & Sales Tax Calculator — Add or Remove Tax | InvoKit",
    description: "Add or remove VAT for UK, EU countries, or US state sales tax. Free, instant calculations with country presets.",
    url: "https://invokit.com/tools/vat-calculator",
  },
};

export default function VATCalculatorPage() {
  return <VATCalculatorClient />;
}
