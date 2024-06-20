import React, { useState, useEffect } from "react";
import axios from "axios";

const StatisticsForMarch = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({});

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        `https://mern-transaction-dashboard.vercel.app/api/TransactionStatistic`,
        {
          params: { month: selectedMonth },
        }
      );

      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching transaction statistics:", error.message);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, [selectedMonth]);

  return (
  
    <div className="bg-white border border-gray-300 shadow-md rounded-lg p-8 w-full h-80  md:w-2/3 lg:w-1/3">
      <h2 className="text-2xl font-bold mb-4  text-gray-800">
        Statistics for {selectedMonth}
      </h2>
      <div className="bg-blue-500 text-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-medium">Total Sale Amount</p>
          <p className="text-lg font-bold">${statistics.totalSaleAmount}</p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-medium">Total Sold Items</p>
          <p className="text-lg font-bold">{statistics.totalSoldItems}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium">Total Not Sold Items</p>
          <p className="text-lg font-bold">{statistics.totalNotSoldItems}</p>
        </div>
      </div>
    </div>

  );
};

export default StatisticsForMarch;
