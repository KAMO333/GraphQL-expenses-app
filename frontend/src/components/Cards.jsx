import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";

const Cards = () => {
  const { data, loading } = useQuery(GET_TRANSACTIONS);
  const { data: authData } = useQuery(GET_AUTHENTICATED_USER);

  return (
    <div className="w-full min-h-[40vh] mt-16 mb-24">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
          Recent Transactions
        </h3>
        {!loading && (
          <span className="bg-slate-200 text-slate-700 text-sm font-bold py-1 px-3 rounded-full">
            {data?.transactions?.length || 0} Entries
          </span>
        )}
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading &&
          data.transactions.map((transaction) => (
            <Card
              key={transaction._id}
              transaction={transaction}
              authUser={authData?.authUser}
            />
          ))}
      </div>

      {!loading && data?.transactions?.length === 0 && (
        <div className="text-center bg-white border border-dashed border-slate-300 rounded-3xl py-16 mt-4 shadow-sm">
          <p className="text-xl font-bold text-slate-700 mb-2">
            No transactions yet
          </p>
          <p className="text-slate-500">
            Record your first entry above to see it here.
          </p>
        </div>
      )}
    </div>
  );
};
export default Cards;
