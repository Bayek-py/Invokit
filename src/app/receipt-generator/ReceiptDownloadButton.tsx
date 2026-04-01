"use client";

import { useState } from "react";
import { useInvoice } from "@/context/InvoiceContext";
import { Download, Loader2 } from "lucide-react";

export default function ReceiptDownloadButton() {
  const { invoice } = useInvoice();
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const [{ pdf }, { default: InvoicePDF }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/components/InvoicePDF"),
      ]);
      const blob = await pdf(<InvoicePDF invoice={invoice} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `receipt-${invoice.invoiceNumber || "draft"}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-medium py-3 px-6 rounded-xl hover:bg-green-700 disabled:opacity-60 transition-colors text-sm"
    >
      {loading ? (
        <><Loader2 size={18} className="animate-spin" /> Generating PDF...</>
      ) : (
        <><Download size={18} /> Download Receipt PDF</>
      )}
    </button>
  );
}
