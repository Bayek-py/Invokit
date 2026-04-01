import type { Metadata } from "next";
import ReceiptGeneratorClient from "./ReceiptGeneratorClient";

export const metadata: Metadata = {
  title: {
    absolute: "Free Receipt Generator — Create Payment Receipts Online | InvoKit",
  },
  description:
    "Create professional payment receipts in seconds. Free PDF download, customizable fields, and no signup required. Perfect for freelancers and small businesses.",
  keywords: [
    "receipt generator",
    "receipt maker",
    "free receipt template",
    "payment receipt",
    "create receipt",
    "online receipt maker",
    "receipt creator",
    "business receipt",
  ],
  alternates: {
    canonical: "https://invokit.com/receipt-generator",
  },
  openGraph: {
    title: "Free Receipt Generator — Create Payment Receipts Online | InvoKit",
    description: "Create professional payment receipts in seconds. Free PDF download, no signup required.",
    url: "https://invokit.com/receipt-generator",
  },
};

export default function ReceiptGeneratorPage() {
  return <ReceiptGeneratorClient />;
}
