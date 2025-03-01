import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";

const categoryColorMap = {
  saving: "from-green-700 to-green-400",
  expense: "from-pink-800 to-pink-600",
  investment: "from-blue-700 to-blue-400",
  // Add more categories and corresponding color classes as needed
};

const Card = ({ cardType }) => {
  const cardClass = categoryColorMap[cardType];

  return (
    <div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-white">Saving</h2>
          <div className="flex items-center gap-2">
            <FaTrash className={"cursor-pointer"} />
            <Link to={`/transaction/123`}>
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>
        <p className="text-white flex items-center gap-1">
          <BsCardText />
          Description: Salary
        </p>
        <p className="text-white flex items-center gap-1">
          <MdOutlinePayments />
          Payment Type: Cash
        </p>
        <p className="text-white flex items-center gap-1">
          <FaSackDollar />
          Amount: $150
        </p>
        <p className="text-white flex items-center gap-1">
          <FaLocationDot />
          Location: Johannesburg
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-black font-bold">21 Feb, 2025</p>
          <img
            src={
              "data:image/jpeg;base64,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"
            }
            className="h-8 w-8 border rounded-full"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
export default Card;
