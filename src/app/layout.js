import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

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

export const metadata = {
  title: "PixelCraft Studio",
  description: "Create amazing pixel art and digital designs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900`}
      >
        <header className="w-full bg-gradient-to-r from-purple-600/90 to-blue-600/90 backdrop-blur-sm flex justify-between px-16 py-6 shadow-lg shadow-purple-500/20 animate-slideDown border-b border-purple-500/20">
          <h1 className="font-bold text-2xl text-white bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 hover:scale-105 transition-transform duration-300">
            PixelCraft Studio
          </h1>

          <nav className="gap-10 flex text-white">
            <div className="transform hover:scale-110 active:scale-95 transition-transform duration-200">
              <Link href="/" className="hover:text-pink-400 transition-colors duration-300 font-medium">
                Home
              </Link>
            </div>
            <div className="transform hover:scale-110 active:scale-95 transition-transform duration-200">
              <Link href="/about" className="hover:text-pink-400 transition-colors duration-300 font-medium">
                About
              </Link>
            </div>
            <div className="transform hover:scale-110 active:scale-95 transition-transform duration-200">
              <Link href="/contact" className="hover:text-pink-400 transition-colors duration-300 font-medium">
                Contact
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="w-full bg-gradient-to-r pt-40 from-purple-950 to-blue-900 backdrop-blur-sm animate-fadeIn border-t border-purple-500/20">
          <p className="pt-6 pb-6 text-xl text-white text-center font-medium">
            © {new Date().getFullYear()} PixelCraft Studio - Crafting Digital Magic
          </p>
        </footer>
      </body>
    </html>
  );
}
