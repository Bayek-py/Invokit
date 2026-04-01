"use client";

import { useInvoice } from "@/context/InvoiceContext";
import { calculateTotal, calculateLineTotal, formatCurrency } from "@/types/invoice";
import { CheckCircle } from "lucide-react";

export default function ReceiptPreview() {
  const { invoice } = useInvoice();
  const { subtotal, discountAmount, taxAmount, total } = calculateTotal(invoice);
  const curr = invoice.currency;

  function formatDate(dateStr: string): string {
    if (!dateStr) return "";
    return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric",
    });
  }

  return (
    <div className="bg-white border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
      <div className="p-8 min-h-[700px] flex flex-col">
        {/* Paid stamp area */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">{invoice.businessName || "Your Business Name"}</h1>
            {invoice.businessEmail && <p className="text-sm text-[var(--muted-foreground)] mt-1">{invoice.businessEmail}</p>}
            {invoice.businessPhone && <p className="text-sm text-[var(--muted-foreground)]">{invoice.businessPhone}</p>}
            {invoice.businessAddress && <p className="text-sm text-[var(--muted-foreground)] whitespace-pre-line">{invoice.businessAddress}</p>}
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end mb-1">
              <CheckCircle size={20} className="text-green-600" />
              <h2 className="text-3xl font-bold text-green-600 uppercase tracking-wide">Receipt</h2>
            </div>
            <p className="text-sm text-[var(--muted-foreground)]">{invoice.invoiceNumber}</p>
          </div>
        </div>

        {/* Receipt for + date */}
        <div className="flex justify-between mb-8">
          <div>
            <h3 className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-2">Receipt For</h3>
            <p className="text-sm font-medium">{invoice.clientName || "Client Name"}</p>
            {invoice.clientEmail && <p className="text-sm text-[var(--muted-foreground)]">{invoice.clientEmail}</p>}
            {invoice.clientAddress && <p className="text-sm text-[var(--muted-foreground)] whitespace-pre-line">{invoice.clientAddress}</p>}
          </div>
          <div className="text-right space-y-1">
            <div className="flex justify-between gap-8 text-sm">
              <span className="text-[var(--muted-foreground)]">Date Paid:</span>
              <span className="font-medium">{formatDate(invoice.invoiceDate)}</span>
            </div>
            <div className="flex justify-between gap-8 text-sm">
              <span className="text-[var(--muted-foreground)]">Receipt #:</span>
              <span className="font-medium">{invoice.invoiceNumber}</span>
            </div>
          </div>
        </div>

        {/* PAID banner */}
        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 mb-6 flex items-center gap-2">
          <CheckCircle size={16} className="text-green-600" />
          <span className="text-sm font-semibold text-green-700">Payment Received — Thank you!</span>
        </div>

        {/* Items */}
        <div className="flex-1">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-green-500">
                <th className="text-left text-xs font-semibold uppercase tracking-wide py-3">Description</th>
                <th className="text-right text-xs font-semibold uppercase tracking-wide py-3 w-20">Qty</th>
                <th className="text-right text-xs font-semibold uppercase tracking-wide py-3 w-28">Rate</th>
                <th className="text-right text-xs font-semibold uppercase tracking-wide py-3 w-28">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, idx) => (
                <tr key={item.id} className={idx % 2 === 0 ? "bg-green-50" : "bg-white"}>
                  <td className="py-3 px-2 text-sm">{item.description || <span className="text-[var(--muted-foreground)] italic">Item description</span>}</td>
                  <td className="py-3 px-2 text-sm text-right">{item.quantity}</td>
                  <td className="py-3 px-2 text-sm text-right">{formatCurrency(item.rate, curr)}</td>
                  <td className="py-3 px-2 text-sm text-right font-medium">{formatCurrency(calculateLineTotal(item), curr)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="mt-8 flex justify-end">
          <div className="w-72 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--muted-foreground)]">Subtotal</span>
              <span className="font-medium">{formatCurrency(subtotal, curr)}</span>
            </div>
            {invoice.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted-foreground)]">Discount ({invoice.discount}%)</span>
                <span className="font-medium text-green-600">-{formatCurrency(discountAmount, curr)}</span>
              </div>
            )}
            {invoice.taxRate > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted-foreground)]">Tax ({invoice.taxRate}%)</span>
                <span className="font-medium">{formatCurrency(taxAmount, curr)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold border-t-2 border-green-500 pt-2">
              <span>Amount Paid</span>
              <span className="text-green-600">{formatCurrency(total, curr)}</span>
            </div>
          </div>
        </div>

        {invoice.notes && (
          <div className="mt-8 pt-6 border-t border-[var(--border)]">
            <h3 className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-2">Notes</h3>
            <p className="text-sm text-[var(--muted-foreground)] whitespace-pre-line">{invoice.notes}</p>
          </div>
        )}

        <div className="mt-auto pt-6 text-center">
          <p className="text-xs text-[var(--muted-foreground)]">
            Made with <a href="/" className="text-[var(--brand)] hover:underline font-medium">InvoKit</a> — Free Receipt Generator
          </p>
        </div>
      </div>
    </div>
  );
}
