"use client";

import { useInvoice } from "@/context/InvoiceContext";
import {
  calculateTotal,
  calculateLineTotal,
  formatCurrency,
} from "@/types/invoice";

export default function InvoicePreview() {
  const { invoice } = useInvoice();
  const { subtotal, discountAmount, taxAmount, total } =
    calculateTotal(invoice);
  const curr = invoice.currency;

  return (
    <div className="bg-white border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
      {/* Invoice Preview - A4 ratio */}
      <div className="p-8 min-h-[700px] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              {invoice.businessName || "Your Business Name"}
            </h1>
            {invoice.businessEmail && (
              <p className="text-sm text-[var(--muted-foreground)] mt-1">
                {invoice.businessEmail}
              </p>
            )}
            {invoice.businessPhone && (
              <p className="text-sm text-[var(--muted-foreground)]">
                {invoice.businessPhone}
              </p>
            )}
            {invoice.businessAddress && (
              <p className="text-sm text-[var(--muted-foreground)] whitespace-pre-line">
                {invoice.businessAddress}
              </p>
            )}
            {invoice.businessTaxId && (
              <p className="text-sm text-[var(--muted-foreground)] mt-1">
                Tax ID: {invoice.businessTaxId}
              </p>
            )}
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold text-[var(--brand)] uppercase tracking-wide">
              Invoice
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] mt-2">
              {invoice.invoiceNumber}
            </p>
          </div>
        </div>

        {/* Client + Dates Row */}
        <div className="flex justify-between mb-8">
          <div>
            <h3 className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-2">
              Bill To
            </h3>
            <p className="text-sm font-medium text-[var(--foreground)]">
              {invoice.clientName || "Client Name"}
            </p>
            {invoice.clientEmail && (
              <p className="text-sm text-[var(--muted-foreground)]">
                {invoice.clientEmail}
              </p>
            )}
            {invoice.clientAddress && (
              <p className="text-sm text-[var(--muted-foreground)] whitespace-pre-line">
                {invoice.clientAddress}
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="space-y-1">
              <div className="flex justify-between gap-8 text-sm">
                <span className="text-[var(--muted-foreground)]">
                  Invoice Date:
                </span>
                <span className="font-medium">
                  {formatDate(invoice.invoiceDate)}
                </span>
              </div>
              <div className="flex justify-between gap-8 text-sm">
                <span className="text-[var(--muted-foreground)]">
                  Due Date:
                </span>
                <span className="font-medium">
                  {formatDate(invoice.dueDate)}
                </span>
              </div>
              <div className="flex justify-between gap-8 text-sm">
                <span className="text-[var(--muted-foreground)]">
                  Payment Terms:
                </span>
                <span className="font-medium">{invoice.paymentTerms}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="flex-1">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[var(--brand)]">
                <th className="text-left text-xs font-semibold text-[var(--foreground)] uppercase tracking-wide py-3">
                  Description
                </th>
                <th className="text-right text-xs font-semibold text-[var(--foreground)] uppercase tracking-wide py-3 w-20">
                  Qty
                </th>
                <th className="text-right text-xs font-semibold text-[var(--foreground)] uppercase tracking-wide py-3 w-28">
                  Rate
                </th>
                <th className="text-right text-xs font-semibold text-[var(--foreground)] uppercase tracking-wide py-3 w-28">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, idx) => (
                <tr
                  key={item.id}
                  className={
                    idx % 2 === 0 ? "bg-[var(--muted)]" : "bg-white"
                  }
                >
                  <td className="py-3 px-2 text-sm text-[var(--foreground)]">
                    {item.description || (
                      <span className="text-[var(--muted-foreground)] italic">
                        Item description
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-sm text-right text-[var(--foreground)]">
                    {item.quantity}
                  </td>
                  <td className="py-3 px-2 text-sm text-right text-[var(--foreground)]">
                    {formatCurrency(item.rate, curr)}
                  </td>
                  <td className="py-3 px-2 text-sm text-right font-medium text-[var(--foreground)]">
                    {formatCurrency(calculateLineTotal(item), curr)}
                  </td>
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
              <span className="font-medium">
                {formatCurrency(subtotal, curr)}
              </span>
            </div>
            {invoice.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted-foreground)]">
                  Discount ({invoice.discount}%)
                </span>
                <span className="font-medium text-[var(--success)]">
                  -{formatCurrency(discountAmount, curr)}
                </span>
              </div>
            )}
            {invoice.taxRate > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted-foreground)]">
                  Tax ({invoice.taxRate}%
                  {invoice.taxInclusive ? " incl." : ""})
                </span>
                <span className="font-medium">
                  {formatCurrency(taxAmount, curr)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold border-t-2 border-[var(--brand)] pt-2">
              <span>Total</span>
              <span className="text-[var(--brand)]">
                {formatCurrency(total, curr)}
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="mt-8 pt-6 border-t border-[var(--border)]">
            <h3 className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-2">
              Notes
            </h3>
            <p className="text-sm text-[var(--muted-foreground)] whitespace-pre-line">
              {invoice.notes}
            </p>
          </div>
        )}

        {/* Watermark - free tier */}
        <div className="mt-auto pt-6 text-center">
          <p className="text-xs text-[var(--muted-foreground)]">
            Made with{" "}
            <a
              href="/"
              className="text-[var(--brand)] hover:underline font-medium"
            >
              InvoKit
            </a>{" "}
            — Free Invoice Generator
          </p>
        </div>
      </div>
    </div>
  );
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
