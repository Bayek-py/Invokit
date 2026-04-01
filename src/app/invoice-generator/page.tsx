import type { Metadata } from "next";
import InvoiceGeneratorClient from "./InvoiceGeneratorClient";

export const metadata: Metadata = {
  title: { absolute: "Free Invoice Generator — Create PDF Invoices Online | InvoKit" },
  description:
    "Create professional invoices in seconds. Free online invoice generator with PDF export, automatic tax calculation, and customizable templates. No signup required.",
  keywords: [
    "invoice generator",
    "free invoice generator",
    "online invoice maker",
    "create invoice",
    "PDF invoice",
    "invoice creator",
  ],
  alternates: {
    canonical: "https://invokit.com/invoice-generator",
  },
  openGraph: {
    title: "Free Invoice Generator — Create PDF Invoices Online | InvoKit",
    description: "Create professional invoices in seconds. Free PDF export, automatic tax calculation. No signup required.",
    url: "https://invokit.com/invoice-generator",
  },
};

export default function InvoiceGeneratorPage() {
  return <InvoiceGeneratorClient />;
}
