import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "../graphql/mutations/transcation.mutation";

const categoryStyles = {
  saving: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  expense: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
  },
  investment: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
  },
};

const Card = ({ transaction, authUser }) => {
  let { category, amount, location, date, paymentType, description } =
    transaction;

  const style = categoryStyles[category] || categoryStyles.expense;

  const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: ["GetTransactions", "GetTransactionStatistics"],
  });

  description = description[0]?.toUpperCase() + description.slice(1);
  const displayCategory = category[0]?.toUpperCase() + category.slice(1);
  const displayPayment = paymentType[0]?.toUpperCase() + paymentType.slice(1);

  const formattedDate = formatDate(date);

  const handleDelete = async () => {
    try {
      await deleteTransaction({
        variables: { transactionId: transaction._id },
      });
      toast.success("Entry deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 relative group">
      {}
      <div className="flex justify-between items-start mb-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${style.bg} ${style.text} ${style.border}`}
        >
          {displayCategory}
        </span>

        <div className="flex items-center gap-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Link
            to={`/transaction/${transaction._id}`}
            className="hover:text-violet-600 transition-colors"
          >
            <HiPencilAlt size={18} />
          </Link>
          {!loading ? (
            <button
              onClick={handleDelete}
              className="hover:text-rose-600 transition-colors"
            >
              <FaTrash size={15} />
            </button>
          ) : (
            <div className="w-4 h-4 border-2 border-slate-300 border-t-rose-500 rounded-full animate-spin"></div>
          )}
        </div>
      </div>

      {}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 line-clamp-1 mb-1">
          {description}
        </h2>
        <p className="text-3xl font-black text-slate-900 tracking-tight">
          $
          {amount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>

      {}
      <div className="flex flex-col gap-2.5 mb-6">
        <div className="flex items-center text-sm font-medium text-slate-500">
          <MdOutlinePayments className="mr-2.5 text-slate-400" size={18} />
          {displayPayment}
        </div>
        <div className="flex items-center text-sm font-medium text-slate-500">
          <FaLocationDot className="mr-2.5 text-slate-400" size={16} />
          <span className="line-clamp-1">{location || "Not specified"}</span>
        </div>
      </div>

      {}
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {formattedDate}
        </span>

        {}
        <div className="h-9 w-9 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden flex-shrink-0">
          <img
            src={
              authUser?.profilePicture ||
              `https://ui-avatars.com/api/?name=${authUser?.name || "U"}&background=f1f5f9&color=6366f1&bold=true`
            }
            alt="User avatar"
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${authUser?.name || "U"}&background=f1f5f9&color=6366f1&bold=true`;
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Card;
