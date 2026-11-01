import "./globals.css";
import localFont from "next/font/local";

const body = localFont({
  src: "./fonts/IBMPlexSans-Variable.woff2",
  display: "swap",
  variable: "--font-body",
  weight: "100 700",
});

const display = localFont({
  src: "./fonts/EBGaramond-Variable.woff2",
  display: "swap",
  variable: "--font-display",
  weight: "400 800",
});

const mono = localFont({
  src: "./fonts/JetBrainsMono-Variable.woff2",
  display: "swap",
  variable: "--font-space-mono",
  weight: "100 800",
});

export const metadata = {
  metadataBase: new URL("https://vpatel.vercel.app"),
  title: "Vaibhav Patel | Full-Stack Developer",
  description:
    "Computer Engineering student and Full-Stack Developer building scalable web applications, multi-tenant SaaS platforms, and modern user experiences.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "SaaS",
    "Web Applications",
    "Portfolio",
    "Vaibhav Patel",
    "Computer Engineering",
  ],
  authors: [{ name: "Vaibhav Patel" }],
  creator: "Vaibhav Patel",
  openGraph: {
    title: "Vaibhav Patel | Full-Stack Developer",
    description:
      "Building scalable web applications, multi-tenant SaaS platforms, and modern user experiences.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Vaibhav Patel - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaibhav Patel | Full-Stack Developer",
    description:
      "Computer Engineering student and Full-Stack Developer building production-ready web applications.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#080A0D",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-night text-mist antialiased overflow-hidden selection:bg-signal selection:text-night">
        {children}
      </body>
    </html>
  );
}
