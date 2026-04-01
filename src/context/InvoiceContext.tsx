"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  type InvoiceData,
  type LineItem,
  createDefaultInvoice,
  TAX_PRESETS,
} from "@/types/invoice";

interface InvoiceContextType {
  invoice: InvoiceData;
  updateField: <K extends keyof InvoiceData>(
    key: K,
    value: InvoiceData[K]
  ) => void;
  updateItem: (id: string, field: keyof LineItem, value: string | number) => void;
  addItem: () => void;
  removeItem: (id: string) => void;
  resetInvoice: () => void;
}

const InvoiceContext = createContext<InvoiceContextType | null>(null);

export function InvoiceProvider({ children }: { children: ReactNode }) {
  const [invoice, setInvoice] = useState<InvoiceData>(createDefaultInvoice);

  const updateField = useCallback(
    <K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) => {
      setInvoice((prev) => {
        const next = { ...prev, [key]: value };
        // Auto-set tax rate when tax type changes
        if (key === "taxType") {
          const preset = TAX_PRESETS[value as keyof typeof TAX_PRESETS];
          if (preset && preset.rate > 0) {
            next.taxRate = preset.rate;
          }
        }
        return next;
      });
    },
    []
  );

  const updateItem = useCallback(
    (id: string, field: keyof LineItem, value: string | number) => {
      setInvoice((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      }));
    },
    []
  );

  const addItem = useCallback(() => {
    setInvoice((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: crypto.randomUUID(),
          description: "",
          quantity: 1,
          rate: 0,
          tax: 0,
        },
      ],
    }));
  }, []);

  const removeItem = useCallback((id: string) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  }, []);

  const resetInvoice = useCallback(() => {
    setInvoice(createDefaultInvoice());
  }, []);

  return (
    <InvoiceContext.Provider
      value={{ invoice, updateField, updateItem, addItem, removeItem, resetInvoice }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoice() {
  const ctx = useContext(InvoiceContext);
  if (!ctx) throw new Error("useInvoice must be used within InvoiceProvider");
  return ctx;
}
