import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// UPDATE this to your real domain before launch
const SITE_URL = "https://invokit.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "InvoKit — Free Invoice Generator | Create & Send PDF Invoices",
    template: "%s | InvoKit",
  },
  description:
    "Free invoice generator, GST calculator, ABN lookup, estimate maker, and receipt generator. Create professional PDF invoices online. No signup required.",
  keywords: [
    "invoice generator",
    "free invoice generator",
    "free invoice template",
    "GST calculator",
    "ABN lookup",
    "estimate generator",
    "receipt generator",
    "invoice maker",
    "PDF invoice",
    "online invoicing",
  ],
  authors: [{ name: "InvoKit" }],
  creator: "InvoKit",
  publisher: "InvoKit",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "InvoKit",
    title: "InvoKit — Free Invoice Generator & Business Tools",
    description:
      "Free invoice generator, GST calculator, ABN lookup, estimates, and receipts. Create professional PDF invoices in seconds. No signup required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InvoKit — Free Invoice Generator and Business Toolkit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@invokit",
    creator: "@invokit",
    title: "InvoKit — Free Invoice Generator & Business Tools",
    description:
      "Free invoice generator, GST calculator, ABN lookup, estimates & receipts. No signup. Instant PDF download.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        {/* Organization schema — site-wide brand signal */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "InvoKit",
              url: SITE_URL,
              logo: `${SITE_URL}/logo.png`,
              description:
                "Free online invoicing toolkit. Invoice generator, GST calculator, ABN lookup, estimate maker, and receipt generator.",
              sameAs: [],
            }),
          }}
        />
        {/* SoftwareApplication schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "InvoKit",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "1200",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}

function Navbar() {
  return (
    <header className="border-b border-[var(--border)] bg-white sticky top-0 z-50">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <a href="/" className="flex items-center gap-2" aria-label="InvoKit — Home">
          <div className="w-8 h-8 bg-[var(--brand)] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm" aria-hidden="true">IK</span>
          </div>
          <span className="font-semibold text-xl text-[var(--foreground)]">InvoKit</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="/invoice-generator" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            Invoice Generator
          </a>
          <a href="/estimate-generator" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            Estimates
          </a>
          <a href="/receipt-generator" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            Receipts
          </a>
          <div className="relative group">
            <button className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors flex items-center gap-1">
              Tax Tools
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                <path d="M6 8L1 3h10L6 8z" />
              </svg>
            </button>
            <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-[var(--border)] rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <a href="/tools/gst-calculator" className="block px-4 py-2.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] rounded-t-xl">GST Calculator</a>
              <a href="/tools/vat-calculator" className="block px-4 py-2.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]">VAT / Sales Tax</a>
              <a href="/tools/abn-lookup" className="block px-4 py-2.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] rounded-b-xl">ABN Lookup</a>
            </div>
          </div>
        </div>
        <a
          href="/invoice-generator"
          className="bg-[var(--brand)] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[var(--brand-dark)] transition-colors"
        >
          Create Invoice
        </a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--muted)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-sm text-[var(--foreground)] mb-3">Generators</h3>
            <ul className="space-y-2">
              <li><a href="/invoice-generator" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">Invoice Generator</a></li>
              <li><a href="/estimate-generator" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">Estimate Generator</a></li>
              <li><a href="/receipt-generator" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">Receipt Generator</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-[var(--foreground)] mb-3">Tax Tools</h3>
            <ul className="space-y-2">
              <li><a href="/tools/gst-calculator" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">GST Calculator</a></li>
              <li><a href="/tools/vat-calculator" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">VAT Calculator</a></li>
              <li><a href="/tools/abn-lookup" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">ABN Lookup</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-[var(--foreground)] mb-3">Templates</h3>
            <ul className="space-y-2">
              <li><a href="/invoice-templates" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">All Templates</a></li>
              <li><a href="/invoice-templates/professional" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">Professional</a></li>
              <li><a href="/invoice-templates/modern" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">Modern</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-[var(--foreground)] mb-3">Company</h3>
            <ul className="space-y-2">
              <li><a href="/blog" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">Blog</a></li>
              <li><a href="/pricing" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">Pricing</a></li>
              <li><a href="/privacy" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--muted-foreground)]">
            &copy; {new Date().getFullYear()} InvoKit. Free invoice generator for freelancers and small businesses.
          </p>
          <p className="text-xs text-[var(--muted-foreground)]">
            <a href="/invoice-generator" className="hover:text-[var(--foreground)]">Invoice Generator</a>
            {" · "}
            <a href="/tools/gst-calculator" className="hover:text-[var(--foreground)]">GST Calculator</a>
            {" · "}
            <a href="/tools/abn-lookup" className="hover:text-[var(--foreground)]">ABN Lookup</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
