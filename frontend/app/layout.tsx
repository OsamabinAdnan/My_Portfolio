import type { Metadata } from "next";
import { Inter, Space_Grotesk, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickySocialSidebar } from "@/components/ui/StickySocialSidebar";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import ChatWidget from "@/components/ui/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Osama bin Adnan | Agentic AI Developer, Web Developer, Digital Marketer & Textile Engineer",
  description: "Agentic AI Developer & Full Stack Developer building autonomous agent systems and modern web products. Learning and Specializing in agentic workflows, RAG systems, and cloud-native app delivery.",
  keywords: ["FullStack Developer", "Agentic AI Developer", "AI Automation", "Portfolio", "AI Agents", "React", "Next.js", "Python", "FastAPI", "Digital FTEs", "RAG Systems"],
  authors: [{ name: "Osama bin Adnan" }],
  icons: {
    icon: "/osama-about.png",
    shortcut: "/osama-about.png",
    apple: "/osama-about.png",
  },
  openGraph: {
    title: "Osama bin Adnan | Agentic AI Developer, Web Developer, Digital Marketer & Textile Engineer",
    description: "Agentic AI Developer, Web Developer, Digital Marketer & Textile Engineer building autonomous agent systems and modern web products",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${orbitron.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <WhatsAppFloat />
          <ChatWidget />
          <Header />
          <StickySocialSidebar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}