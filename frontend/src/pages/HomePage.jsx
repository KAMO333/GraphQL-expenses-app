import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import Cards from "../components/Cards";
import TransactionForm from "../components/TransactionForm";
import { GET_TRANSACTION_STATISTICS } from "../graphql/queries/transaction.query";

ChartJS.register(ArcElement, Tooltip, Legend);

const categoryLabelColor = {
  saving: "rgba(63, 168, 138, 1)",
  expense: "rgba(216, 104, 90, 1)",
  investment: "rgba(108, 142, 227, 1)",
};

const HomePage = () => {
  const { data } = useQuery(GET_TRANSACTION_STATISTICS);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "$",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
        cutout: 130,
      },
    ],
  });

  useEffect(() => {
    if (data?.categoryStatistics) {
      const categories = data.categoryStatistics.map((stat) => stat.category);
      const totalAmounts = data.categoryStatistics.map(
        (stat) => stat.totalAmount,
      );

      const backgroundColors = [];
      const borderColors = [];

      categories.forEach((category) => {
        if (category === "saving") {
          backgroundColors.push("rgba(63, 168, 138, 0.85)");
          borderColors.push("rgba(63, 168, 138, 1)");
        } else if (category === "expense") {
          backgroundColors.push("rgba(216, 104, 90, 0.85)");
          borderColors.push("rgba(216, 104, 90, 1)");
        } else if (category === "investment") {
          backgroundColors.push("rgba(108, 142, 227, 0.85)");
          borderColors.push("rgba(108, 142, 227, 1)");
        }
      });

      setChartData((prev) => ({
        labels: categories,
        datasets: [
          {
            ...prev.datasets[0],
            data: totalAmounts,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
          },
        ],
      }));
    }
  }, [data]);

  const grandTotal = data?.categoryStatistics?.reduce(
    (sum, stat) => sum + stat.totalAmount,
    0,
  );

  return (
    <div className="flex flex-col gap-8 items-center w-full z-20 relative pb-12">
      {}
      <div className="w-full max-w-6xl mx-auto text-center md:text-left mb-2 mt-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-slate-500 font-medium mt-2 text-lg">
          Spend wisely, track wisely.
        </p>
      </div>

      {}
      <div className="flex flex-col lg:flex-row w-full max-w-6xl justify-center items-start gap-8 px-4 sm:px-6 lg:px-8">
        {}
        {data?.categoryStatistics.length > 0 && (
          <div className="w-full lg:w-1/2 max-w-xl mx-auto rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 flex flex-col items-center justify-center">
            <div className="relative h-[280px] w-[280px] md:h-[300px] md:w-[300px]">
              <Doughnut
                data={chartData}
                options={{
                  plugins: { legend: { display: false } },
                }}
              />

              {}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Total
                </span>
                <span className="font-black text-3xl text-slate-900 mt-1">
                  ${grandTotal?.toFixed(0)}
                </span>
              </div>
            </div>

            {}
            <ul className="flex gap-6 mt-8 flex-wrap justify-center">
              {data.categoryStatistics.map((stat) => (
                <li
                  key={stat.category}
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 capitalize"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: categoryLabelColor[stat.category],
                    }}
                  />
                  {stat.category}
                </li>
              ))}
            </ul>
          </div>
        )}

        {}
        <div className="w-full lg:w-1/2 max-w-xl mx-auto">
          <TransactionForm />
        </div>
      </div>

      {}
      <Cards />
    </div>
  );
};

export default HomePage;
