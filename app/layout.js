import "../src/index.css";
import Link from "next/link";

export const metadata = {
  title: "Project Interview",
  description: "Interview practice application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="flex items-center justify-between px-6 py-4 bg-gray-900/90 backdrop-blur text-white shadow-md sticky top-0 z-50">
          <div className="font-bold text-lg tracking-wide">
            <Link href="/" className="hover:text-yellow-400 transition-colors">
              Project Interview
            </Link>
          </div>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="/interview" className="hover:text-yellow-400 transition-colors">
              Interview
            </Link>
            <Link href="/history" className="hover:text-yellow-400 transition-colors">
              History
            </Link>
            <Link href="/heatmap" className="hover:text-yellow-400 transition-colors">
              Heatmap
            </Link>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
