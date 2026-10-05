import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Topbar } from "@/components/navbar";
import { Modal, ModalContent } from "@heroui/modal";
import { useModal } from '@/contexts/ModalContext';
import AdminPasswordModal from '@/components/modalComponents/admin_modal'
import ModalComponent from "@/components/modalComponents/adminModalComponent";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light", enableSystem: false }}>
          <div className="w-full flex flex-col h-screen">
            <Topbar />
            <main className="w-full">
             
              {children}
              <ModalComponent />
            </main>
           <footer className="w-full flex items-center justify-center py-8 bg-gray-900 text-white">
  <div className="text-center">
    <p className="text-lg font-semibold mb-2">Art Gallery</p>
    <p className="text-sm text-gray-400">
      © {new Date().getFullYear()} All rights reserved.
    </p>
  </div>
</footer>
            <ToastContainer
              className="foo"
              style={{ width: "400px" }}
              position="top-right"
              autoClose={1800}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        </Providers>
      </body>
    </html>
  );
}
