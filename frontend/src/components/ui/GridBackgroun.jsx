const GridBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-slate-50/50 overflow-hidden font-sans text-slate-900">
      {/* Subtle modern background gradient glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-rose-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};
export default GridBackground;
