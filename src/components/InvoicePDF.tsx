"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import {
  type InvoiceData,
  calculateTotal,
  calculateLineTotal,
  formatCurrency,
} from "@/types/invoice";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#111827",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  businessName: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  invoiceTitle: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#2563eb",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  invoiceNumber: {
    fontSize: 10,
    color: "#6b7280",
    marginTop: 4,
    textAlign: "right",
  },
  muted: {
    color: "#6b7280",
    fontSize: 9,
  },
  sectionTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  // Table
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#2563eb",
    paddingBottom: 8,
    marginBottom: 0,
  },
  tableHeaderText: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  tableRowAlt: {
    backgroundColor: "#f3f4f6",
  },
  colDesc: { flex: 1 },
  colQty: { width: 50, textAlign: "right" },
  colRate: { width: 80, textAlign: "right" },
  colAmount: { width: 80, textAlign: "right" },
  // Totals
  totalsContainer: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 220,
    marginBottom: 4,
  },
  totalFinal: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 220,
    borderTopWidth: 2,
    borderTopColor: "#2563eb",
    paddingTop: 8,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
  },
  totalValue: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#2563eb",
  },
  notes: {
    marginTop: 30,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  watermark: {
    marginTop: "auto",
    paddingTop: 20,
    textAlign: "center",
    fontSize: 8,
    color: "#9ca3af",
  },
});

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function InvoicePDF({ invoice }: { invoice: InvoiceData }) {
  const { subtotal, discountAmount, taxAmount, total } =
    calculateTotal(invoice);
  const curr = invoice.currency;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.businessName}>
              {invoice.businessName || "Your Business Name"}
            </Text>
            {invoice.businessEmail ? (
              <Text style={styles.muted}>{invoice.businessEmail}</Text>
            ) : null}
            {invoice.businessPhone ? (
              <Text style={styles.muted}>{invoice.businessPhone}</Text>
            ) : null}
            {invoice.businessAddress ? (
              <Text style={styles.muted}>{invoice.businessAddress}</Text>
            ) : null}
            {invoice.businessTaxId ? (
              <Text style={[styles.muted, { marginTop: 4 }]}>
                Tax ID: {invoice.businessTaxId}
              </Text>
            ) : null}
          </View>
          <View>
            <Text style={styles.invoiceTitle}>Invoice</Text>
            <Text style={styles.invoiceNumber}>{invoice.invoiceNumber}</Text>
          </View>
        </View>

        {/* Bill To + Dates */}
        <View style={styles.row}>
          <View>
            <Text style={styles.sectionTitle}>Bill To</Text>
            <Text style={{ fontFamily: "Helvetica-Bold", marginBottom: 2 }}>
              {invoice.clientName || "Client Name"}
            </Text>
            {invoice.clientEmail ? (
              <Text style={styles.muted}>{invoice.clientEmail}</Text>
            ) : null}
            {invoice.clientAddress ? (
              <Text style={styles.muted}>{invoice.clientAddress}</Text>
            ) : null}
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <View style={{ flexDirection: "row", marginBottom: 4 }}>
              <Text style={[styles.muted, { width: 90 }]}>Invoice Date:</Text>
              <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 10 }}>
                {formatDate(invoice.invoiceDate)}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 4 }}>
              <Text style={[styles.muted, { width: 90 }]}>Due Date:</Text>
              <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 10 }}>
                {formatDate(invoice.dueDate)}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.muted, { width: 90 }]}>
                Payment Terms:
              </Text>
              <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 10 }}>
                {invoice.paymentTerms}
              </Text>
            </View>
          </View>
        </View>

        {/* Table */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.colDesc]}>
            Description
          </Text>
          <Text style={[styles.tableHeaderText, styles.colQty]}>Qty</Text>
          <Text style={[styles.tableHeaderText, styles.colRate]}>Rate</Text>
          <Text style={[styles.tableHeaderText, styles.colAmount]}>
            Amount
          </Text>
        </View>
        {invoice.items.map((item, idx) => (
          <View
            key={item.id}
            style={[
              styles.tableRow,
              idx % 2 === 0 ? styles.tableRowAlt : {},
            ]}
          >
            <Text style={styles.colDesc}>
              {item.description || "Item description"}
            </Text>
            <Text style={styles.colQty}>{item.quantity}</Text>
            <Text style={styles.colRate}>
              {formatCurrency(item.rate, curr)}
            </Text>
            <Text style={[styles.colAmount, { fontFamily: "Helvetica-Bold" }]}>
              {formatCurrency(calculateLineTotal(item), curr)}
            </Text>
          </View>
        ))}

        {/* Totals */}
        <View style={styles.totalsContainer}>
          <View style={styles.totalsRow}>
            <Text style={styles.muted}>Subtotal</Text>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>
              {formatCurrency(subtotal, curr)}
            </Text>
          </View>
          {invoice.discount > 0 && (
            <View style={styles.totalsRow}>
              <Text style={styles.muted}>
                Discount ({invoice.discount}%)
              </Text>
              <Text style={{ fontFamily: "Helvetica-Bold", color: "#16a34a" }}>
                -{formatCurrency(discountAmount, curr)}
              </Text>
            </View>
          )}
          {invoice.taxRate > 0 && (
            <View style={styles.totalsRow}>
              <Text style={styles.muted}>
                Tax ({invoice.taxRate}%{invoice.taxInclusive ? " incl." : ""})
              </Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>
                {formatCurrency(taxAmount, curr)}
              </Text>
            </View>
          )}
          <View style={styles.totalFinal}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(total, curr)}
            </Text>
          </View>
        </View>

        {/* Notes */}
        {invoice.notes ? (
          <View style={styles.notes}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={styles.muted}>{invoice.notes}</Text>
          </View>
        ) : null}

        {/* Watermark */}
        <Text style={styles.watermark}>
          Made with InvoKit — Free Invoice Generator
        </Text>
      </Page>
    </Document>
  );
}
