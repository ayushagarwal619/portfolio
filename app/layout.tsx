import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import TransitionRouter from "@/components/TransitionRouter";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Ayush Kumar Agarwal | Full Stack Developer · AI/ML Enthusiast",
  description:
    "Building AI-powered products, full-stack applications, and ideas that can scale. Portfolio of Ayush Kumar Agarwal, Computer Science & Business Systems student at Heritage Institute of Technology.",
  authors: [{ name: "Ayush Kumar Agarwal" }],
  keywords: [
    "Ayush Kumar Agarwal",
    "Full Stack Developer",
    "AI/ML",
    "Next.js",
    "React",
    "Python",
    "Portfolio",
    "Machine Learning",
    "Streamlit",
    "FastAPI",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <SmoothScroll />
        <AppProvider>
          <TransitionRouter>
            <Navbar />
            <LoadingScreen>{children}</LoadingScreen>
          </TransitionRouter>
        </AppProvider>
      </body>
    </html>
  );
}
