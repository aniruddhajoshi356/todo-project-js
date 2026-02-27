import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">

      <nav className="flex items-center justify-between p-6 border-b border-gray-100 bg-white"> 
        <div className="flex items-center gap-2">
          <img src="/download.png" alt="Planora" className="w-10 h-10" />{" "}
          <span className="text-violet-600 font-bold text-2xl">Planora</span>
        </div>
        <Link
          to="/login"
          className="text-gray-500 hover:text-gray-800 border border-gray-200 px-4 py-1.5 rounded-lg transition-colors"
        >
          Sign in
        </Link>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center text-center p-0 gap-6">
        <p className="text-sm font-semibold tracking-widest text-violet-500 uppercase">
          Task Management, Simplified
        </p>

        <h1 className="text-6xl md:text-8xl font-extrabold leading-tight tracking-tight text-gray-900">
          Stay on top of<br />
          <span className="text-violet-600">everything.</span>
        </h1>

        <p className="text-black text-lg md:text-xl max-w-lg leading-relaxed">
          Capture tasks, set priorities, and track progress — all in one quiet, focused place.
        </p>

        <div className="flex items-center gap-4 mt-2">
          <Link
            to="/signup"
            className="px-8 py-3.5 text-xl text-white font-semibold bg-violet-600 rounded-xl shadow-md shadow-violet-200"
          >
            Get started free
          </Link>
          <Link
            to="/login"
            className="px-7 py-3.5 text-xl font-semibold text-gray-500 border border-gray-200 rounded-xl bg-white"
          >
            Sign in
          </Link>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <span className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-violet-600 border border-violet-200 bg-violet-50 rounded-full">
            🏷️ Smart categories
          </span>
          <span className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-amber-600 border border-amber-200 bg-amber-50 rounded-full">
            ⭐ Priority ratings
          </span>
          <span className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-sky-600 border border-sky-200 bg-sky-50 rounded-full">
            ⚡ Real-time updates
          </span>
        </div>
      </main>

    </div>
  );
}
