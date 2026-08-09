import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="flex items-center justify-center min-h-[80vh]">
      <div className="text-center px-6 max-w-md mx-auto mt-10">
        {/* Illustration */}
        <div className="max-w-[220px] mx-auto mb-8 opacity-90 drop-shadow-sm">
          <img src="/404.svg" alt="404 Not Found" className="w-full h-auto" />
        </div>

        {/* Text Content */}
        <p className="text-xs font-bold tracking-widest uppercase text-violet-600 mb-3">
          Error 404
        </p>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
          Page not found
        </h1>
        <p className="text-slate-500 font-medium mb-8">
          The ledger entry or page you are looking for doesn&apos;t exist or has
          been moved.
        </p>

        {/* Corrected Link Button */}
        <Link
          to="/"
          className="inline-flex items-center justify-center bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold py-3 px-8 rounded-full shadow-lg shadow-violet-600/30 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Take me home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
