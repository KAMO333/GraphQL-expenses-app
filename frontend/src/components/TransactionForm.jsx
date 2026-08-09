import { useMutation } from "@apollo/client";
import { CREATE_TRANSACTION } from "../graphql/mutations/transcation.mutation";
import toast from "react-hot-toast";

// Reusable Tailwind classes for the Dribbble aesthetic
const fieldClass =
  "w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all duration-200 placeholder:text-slate-400 font-medium";
const labelClass =
  "block text-xs font-bold tracking-wide text-slate-500 uppercase mb-2 ml-1";

const TransactionForm = () => {
  const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: ["GetTransactions", "GetTransactionStatistics"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const transactionData = {
      description: formData.get("description"),
      paymentType: formData.get("paymentType"),
      category: formData.get("category"),
      amount: parseFloat(formData.get("amount")),
      location: formData.get("location"),
      date: formData.get("date"),
    };

    try {
      await createTransaction({ variables: { input: transactionData } });
      form.reset();
      toast.success("Transaction created successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      className="w-full max-w-xl mx-auto flex flex-col gap-6 p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      onSubmit={handleSubmit}
    >
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Add New Entry
        </h2>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Record your latest spending or income
        </p>
      </div>

      <div className="w-full">
        <label className={labelClass} htmlFor="description">
          Transaction Name
        </label>
        <input
          className={fieldClass}
          id="description"
          name="description"
          type="text"
          required
          placeholder="e.g., Netflix Subscription, Groceries"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full flex-1">
          <label className={labelClass} htmlFor="paymentType">
            Payment
          </label>
          <select
            className={`${fieldClass} cursor-pointer appearance-none`}
            id="paymentType"
            name="paymentType"
          >
            <option value={"card"}>Credit Card</option>
            <option value={"cash"}>Cash</option>
          </select>
        </div>

        <div className="w-full flex-1">
          <label className={labelClass} htmlFor="category">
            Category
          </label>
          <select
            className={`${fieldClass} cursor-pointer appearance-none`}
            id="category"
            name="category"
          >
            <option value={"saving"}>Saving</option>
            <option value={"expense"}>Expense</option>
            <option value={"investment"}>Investment</option>
          </select>
        </div>

        <div className="w-full flex-1">
          <label className={labelClass} htmlFor="amount">
            Amount ($)
          </label>
          <input
            className={fieldClass}
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            required
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full flex-1">
          <label className={labelClass} htmlFor="location">
            Location
          </label>
          <input
            className={fieldClass}
            id="location"
            name="location"
            type="text"
            placeholder="e.g., Johannesburg"
          />
        </div>

        <div className="w-full flex-1">
          <label className={labelClass} htmlFor="date">
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            className={`${fieldClass} cursor-pointer`}
            required
          />
        </div>
      </div>

      <button
        className="mt-2 text-white font-bold text-base w-full rounded-xl px-4 py-4 bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-600/30 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        type="submit"
        disabled={loading}
      >
        {loading ? "Processing..." : "Save Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;
