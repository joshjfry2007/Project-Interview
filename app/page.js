import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-8">
      <h1 className="text-4xl font-extrabold text-yellow-400 mb-4 tracking-wide">
        Welcome to Project Interview
      </h1>
      <p className="text-lg text-gray-300 max-w-lg mb-8">
        Practice technical, behavioral, and communication interview questions with simulated real-time feedback and scoring.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/interview"
          className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition-colors shadow-lg"
        >
          Start Interview
        </Link>
        <Link
          href="/history"
          className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 transition-colors shadow-lg"
        >
          View History
        </Link>
        <Link
          href="/heatmap"
          className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 transition-colors shadow-lg"
        >
          View Heatmap
        </Link>
      </div>
    </div>
  );
}
