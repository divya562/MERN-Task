import React, { useState } from "react";
import TransactionsTable from "./Components/TransactionTable";
import StatisticsForMonth from "./Components/TransactionStatitics";
import BarChart from "./Components/Barchart";

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState("March"); 
  const [searchQuery, setSearchQuery] = useState("");

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className=" container mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Transaction Dashboard
      </h1>

      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 px-3 py-2 rounded-lg w-1/3 focus:outline-none focus:ring focus:border-blue-500"
        />

        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        >
          {monthNames.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <TransactionsTable
        selectedMonth={selectedMonth}
        searchQuery={searchQuery}
      />
      <div className="flex justify-evenly mt-16">
        <StatisticsForMonth selectedMonth={selectedMonth} />

        <BarChart selectedMonth={selectedMonth} />
      </div>
    </div>
  );
};

export default App;

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
