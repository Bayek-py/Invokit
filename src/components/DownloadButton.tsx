"use client";

import { useState } from "react";
import { useInvoice } from "@/context/InvoiceContext";
import { Download, Loader2 } from "lucide-react";

export default function DownloadButton() {
  const { invoice } = useInvoice();
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      // Dynamic import to avoid SSR issues with @react-pdf/renderer
      const [{ pdf }, { default: InvoicePDF }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./InvoicePDF"),
      ]);
      const blob = await pdf(<InvoicePDF invoice={invoice} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${invoice.invoiceNumber || "invoice"}.pdf`;
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
      className="w-full flex items-center justify-center gap-2 bg-[var(--brand)] text-white font-medium py-3 px-6 rounded-xl hover:bg-[var(--brand-dark)] disabled:opacity-60 transition-colors text-sm"
    >
      {loading ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <Download size={18} />
          Download PDF
        </>
      )}
    </button>
  );
}
