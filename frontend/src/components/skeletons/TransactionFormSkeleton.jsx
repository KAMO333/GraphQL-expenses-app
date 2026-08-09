const TransactionFormSkeleton = () => {
  return (
    <div className="h-screen max-w-xl mx-auto py-10 px-4">
      <div className="rounded-lg bg-panel border border-hairline p-6">
        <h3 className="h-6 w-1/3 bg-ink-700 rounded animate-pulse"></h3>

        <ul className="mt-6 flex gap-3">
          <li className="w-full h-11 bg-ink-700 rounded-md animate-pulse"></li>
        </ul>
        <ul className="mt-4 flex gap-3">
          <li className="w-full h-11 bg-ink-700 rounded-md animate-pulse"></li>
          <li className="w-full h-11 bg-ink-700 rounded-md animate-pulse"></li>
          <li className="w-full h-11 bg-ink-700 rounded-md animate-pulse"></li>
        </ul>
        <ul className="mt-4 flex gap-3">
          <li className="w-full h-11 bg-ink-700 rounded-md animate-pulse"></li>
          <li className="w-full h-11 bg-ink-700 rounded-md animate-pulse"></li>
        </ul>
        <ul className="mt-6 flex gap-3">
          <li className="w-full h-12 bg-gold/30 rounded-md animate-pulse"></li>
        </ul>
      </div>
    </div>
  );
};
export default TransactionFormSkeleton;
