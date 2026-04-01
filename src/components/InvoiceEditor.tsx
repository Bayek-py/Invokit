"use client";

import { useInvoice } from "@/context/InvoiceContext";
import { CURRENCIES, TAX_PRESETS, type InvoiceData } from "@/types/invoice";
import { Plus, Trash2, RotateCcw } from "lucide-react";

export default function InvoiceEditor() {
  const { invoice, updateField, updateItem, addItem, removeItem, resetInvoice } =
    useInvoice();

  return (
    <div className="space-y-6">
      {/* Invoice Meta */}
      <Section title="Invoice Details">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Invoice Number"
            value={invoice.invoiceNumber}
            onChange={(v) => updateField("invoiceNumber", v)}
          />
          <Select
            label="Currency"
            value={invoice.currency}
            onChange={(v) => updateField("currency", v)}
            options={CURRENCIES.map((c) => ({
              value: c.code,
              label: `${c.symbol} ${c.code}`,
            }))}
          />
          <Input
            label="Invoice Date"
            type="date"
            value={invoice.invoiceDate}
            onChange={(v) => updateField("invoiceDate", v)}
          />
          <Input
            label="Due Date"
            type="date"
            value={invoice.dueDate}
            onChange={(v) => updateField("dueDate", v)}
          />
        </div>
      </Section>

      {/* Business Details */}
      <Section title="Your Business">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Business Name"
            value={invoice.businessName}
            onChange={(v) => updateField("businessName", v)}
            placeholder="Your Company Ltd"
          />
          <Input
            label="Tax ID / ABN"
            value={invoice.businessTaxId}
            onChange={(v) => updateField("businessTaxId", v)}
            placeholder="e.g. 12 345 678 901"
          />
          <Input
            label="Email"
            type="email"
            value={invoice.businessEmail}
            onChange={(v) => updateField("businessEmail", v)}
            placeholder="you@company.com"
          />
          <Input
            label="Phone"
            value={invoice.businessPhone}
            onChange={(v) => updateField("businessPhone", v)}
            placeholder="+1 234 567 890"
          />
        </div>
        <Textarea
          label="Address"
          value={invoice.businessAddress}
          onChange={(v) => updateField("businessAddress", v)}
          placeholder="123 Business St, City, State 12345"
        />
      </Section>

      {/* Client Details */}
      <Section title="Bill To">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Client Name"
            value={invoice.clientName}
            onChange={(v) => updateField("clientName", v)}
            placeholder="Client Company"
          />
          <Input
            label="Client Email"
            type="email"
            value={invoice.clientEmail}
            onChange={(v) => updateField("clientEmail", v)}
            placeholder="client@example.com"
          />
        </div>
        <Textarea
          label="Client Address"
          value={invoice.clientAddress}
          onChange={(v) => updateField("clientAddress", v)}
          placeholder="456 Client Ave, City, State 67890"
        />
      </Section>

      {/* Line Items */}
      <Section title="Line Items">
        <div className="space-y-3">
          {/* Header */}
          <div className="grid grid-cols-[1fr_80px_100px_100px_36px] gap-2 text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">
            <span>Description</span>
            <span>Qty</span>
            <span>Rate</span>
            <span>Amount</span>
            <span></span>
          </div>

          {invoice.items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[1fr_80px_100px_100px_36px] gap-2 items-center"
            >
              <input
                type="text"
                value={item.description}
                onChange={(e) =>
                  updateItem(item.id, "description", e.target.value)
                }
                placeholder="Item description"
                className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent"
              />
              <input
                type="number"
                value={item.quantity || ""}
                onChange={(e) =>
                  updateItem(item.id, "quantity", parseFloat(e.target.value) || 0)
                }
                min="0"
                className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent"
              />
              <input
                type="number"
                value={item.rate || ""}
                onChange={(e) =>
                  updateItem(item.id, "rate", parseFloat(e.target.value) || 0)
                }
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent"
              />
              <div className="px-3 py-2 text-sm text-right font-medium text-[var(--foreground)]">
                {(item.quantity * item.rate).toFixed(2)}
              </div>
              <button
                onClick={() => removeItem(item.id)}
                disabled={invoice.items.length === 1}
                className="p-2 text-[var(--muted-foreground)] hover:text-[var(--danger)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Remove item"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addItem}
          className="mt-3 flex items-center gap-2 text-sm font-medium text-[var(--brand)] hover:text-[var(--brand-dark)] transition-colors"
        >
          <Plus size={16} />
          Add Line Item
        </button>
      </Section>

      {/* Tax & Discount */}
      <Section title="Tax & Discount">
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Tax Type"
            value={invoice.taxType}
            onChange={(v) =>
              updateField("taxType", v as InvoiceData["taxType"])
            }
            options={Object.entries(TAX_PRESETS).map(([key, val]) => ({
              value: key,
              label: val.label,
            }))}
          />
          <Input
            label="Tax Rate (%)"
            type="number"
            value={String(invoice.taxRate)}
            onChange={(v) => updateField("taxRate", parseFloat(v) || 0)}
          />
          <Input
            label="Discount (%)"
            type="number"
            value={String(invoice.discount)}
            onChange={(v) => updateField("discount", parseFloat(v) || 0)}
          />
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={invoice.taxInclusive}
                onChange={(e) =>
                  updateField("taxInclusive", e.target.checked)
                }
                className="w-4 h-4 rounded border-[var(--border)] text-[var(--brand)] focus:ring-[var(--brand)]"
              />
              Tax inclusive
            </label>
          </div>
        </div>
      </Section>

      {/* Notes */}
      <Section title="Additional Info">
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Payment Terms"
            value={invoice.paymentTerms}
            onChange={(v) => updateField("paymentTerms", v)}
            options={[
              { value: "Due on Receipt", label: "Due on Receipt" },
              { value: "Net 7", label: "Net 7" },
              { value: "Net 14", label: "Net 14" },
              { value: "Net 30", label: "Net 30" },
              { value: "Net 60", label: "Net 60" },
            ]}
          />
        </div>
        <Textarea
          label="Notes"
          value={invoice.notes}
          onChange={(v) => updateField("notes", v)}
          placeholder="Thank you for your business!"
        />
      </Section>

      {/* Reset */}
      <button
        onClick={resetInvoice}
        className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--danger)] transition-colors"
      >
        <RotateCcw size={14} />
        Reset Invoice
      </button>
    </div>
  );
}

// ---- Reusable form primitives ----

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-[var(--border)] rounded-xl p-5 space-y-4">
      <h2 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wide">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
