export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  tax: number; // percentage
}

export interface InvoiceData {
  // Invoice meta
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  status: "draft" | "sent" | "paid" | "overdue";

  // Business details
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  businessTaxId: string; // ABN, GST, VAT, EIN etc.
  businessLogo: string | null;

  // Client details
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;

  // Line items
  items: LineItem[];

  // Tax
  taxType: "none" | "gst" | "vat" | "sales_tax" | "custom";
  taxRate: number; // default percentage
  taxInclusive: boolean;

  // Additional
  notes: string;
  paymentTerms: string;
  currency: string;
  discount: number; // percentage
}

export const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "EUR", symbol: "\u20ac", name: "Euro" },
  { code: "GBP", symbol: "\u00a3", name: "British Pound" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar" },
  { code: "INR", symbol: "\u20b9", name: "Indian Rupee" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
  { code: "JPY", symbol: "\u00a5", name: "Japanese Yen" },
] as const;

export const TAX_PRESETS = {
  none: { label: "No Tax", rate: 0 },
  gst: { label: "GST (10%)", rate: 10 },
  vat: { label: "VAT (20%)", rate: 20 },
  sales_tax: { label: "Sales Tax (varies)", rate: 0 },
  custom: { label: "Custom", rate: 0 },
} as const;

export function createDefaultInvoice(): InvoiceData {
  const today = new Date();
  const due = new Date(today);
  due.setDate(due.getDate() + 30);

  return {
    invoiceNumber: "INV-0001",
    invoiceDate: today.toISOString().split("T")[0],
    dueDate: due.toISOString().split("T")[0],
    status: "draft",
    businessName: "",
    businessEmail: "",
    businessPhone: "",
    businessAddress: "",
    businessTaxId: "",
    businessLogo: null,
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientAddress: "",
    items: [
      {
        id: crypto.randomUUID(),
        description: "",
        quantity: 1,
        rate: 0,
        tax: 0,
      },
    ],
    taxType: "none",
    taxRate: 0,
    taxInclusive: false,
    notes: "",
    paymentTerms: "Net 30",
    currency: "USD",
    discount: 0,
  };
}

export function calculateLineTotal(item: LineItem): number {
  return item.quantity * item.rate;
}

export function calculateSubtotal(items: LineItem[]): number {
  return items.reduce((sum, item) => sum + calculateLineTotal(item), 0);
}

export function calculateTaxAmount(
  subtotal: number,
  discount: number,
  taxRate: number,
  taxInclusive: boolean
): number {
  const discountedSubtotal = subtotal - subtotal * (discount / 100);
  if (taxInclusive) {
    return discountedSubtotal - discountedSubtotal / (1 + taxRate / 100);
  }
  return discountedSubtotal * (taxRate / 100);
}

export function calculateTotal(invoice: InvoiceData): {
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  total: number;
} {
  const subtotal = calculateSubtotal(invoice.items);
  const discountAmount = subtotal * (invoice.discount / 100);
  const afterDiscount = subtotal - discountAmount;
  const taxAmount = invoice.taxInclusive
    ? afterDiscount - afterDiscount / (1 + invoice.taxRate / 100)
    : afterDiscount * (invoice.taxRate / 100);
  const total = invoice.taxInclusive
    ? afterDiscount
    : afterDiscount + taxAmount;

  return { subtotal, discountAmount, taxAmount, total };
}

export function formatCurrency(
  amount: number,
  currencyCode: string
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(amount);
}
