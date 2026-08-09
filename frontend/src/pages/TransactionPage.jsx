import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TRANSACTION } from "../graphql/queries/transaction.query";
import { UPDATE_TRANSACTION } from "../graphql/mutations/transcation.mutation";
import TransactionFormSkeleton from "../components/skeletons/TransactionFormSkeleton";
import toast from "react-hot-toast";

// Reusable Tailwind classes matching our new Dribbble aesthetic
const fieldClass =
  "w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all duration-200 placeholder:text-slate-400 font-medium";
const labelClass =
  "block text-xs font-bold tracking-wide text-slate-500 uppercase mb-2 ml-1";

const TransactionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_TRANSACTION, {
    variables: { id: id },
  });

  const [updateTransaction, { loading: updating }] = useMutation(
    UPDATE_TRANSACTION,
    {
      refetchQueries: ["GetTransactions", "GetTransactionStatistics"],
    },
  );

  const [formData, setFormData] = useState({
    description: "",
    paymentType: "",
    category: "",
    amount: "",
    location: "",
    date: "",
  });

  useEffect(() => {
    if (data?.transaction) {
      const { description, paymentType, category, amount, location, date } =
        data.transaction;

      // Format the date for the HTML input (YYYY-MM-DD)
      const formattedDate = new Date(+date).toISOString().split("T")[0];

      setFormData({
        description,
        paymentType,
        category,
        amount,
        location: location || "",
        date: formattedDate,
      });
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTransaction({
        variables: {
          input: {
            transactionId: id,
            ...formData,
            amount: parseFloat(formData.amount),
          },
        },
      });
      toast.success("Transaction updated successfully");
      navigate("/"); // Redirect home after successful update
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <TransactionFormSkeleton />;
  if (error)
    return (
      <p className="text-center text-rose-500 font-bold mt-10">
        Error: {error.message}
      </p>
    );

  return (
    <div className="w-full flex flex-col items-center justify-center pt-8 pb-20 px-4 sm:px-6">
      {/* Page Header */}
      <div className="text-center mb-8">
        <p className="text-xs font-bold tracking-widest uppercase text-violet-600 mb-2">
          Editing Entry
        </p>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Update this transaction
        </h1>
      </div>

      {/* Styled Form Container */}
      <form
        className="w-full max-w-xl flex flex-col gap-6 p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        onSubmit={handleSubmit}
      >
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
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full flex-1">
            <label className={labelClass} htmlFor="paymentType">
              Payment
            </label>
            <div className="relative">
              <select
                className={`${fieldClass} pr-8 cursor-pointer appearance-none`}
                id="paymentType"
                name="paymentType"
                value={formData.paymentType}
                onChange={handleInputChange}
              >
                <option value={"card"}>Credit Card</option>
                <option value={"cash"}>Cash</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full flex-1">
            <label className={labelClass} htmlFor="category">
              Category
            </label>
            <div className="relative">
              <select
                className={`${fieldClass} pr-8 cursor-pointer appearance-none`}
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value={"saving"}>Saving</option>
                <option value={"expense"}>Expense</option>
                <option value={"investment"}>Investment</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
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
              required
              value={formData.amount}
              onChange={handleInputChange}
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
              value={formData.location}
              onChange={handleInputChange}
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
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <button
          className="mt-2 text-white font-bold text-base w-full rounded-xl px-4 py-4 bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-600/30 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          type="submit"
          disabled={updating}
        >
          {updating ? "Updating..." : "Update Transaction"}
        </button>
      </form>
    </div>
  );
};

export default TransactionPage;
