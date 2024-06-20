import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionsTable = ({ selectedMonth, searchQuery }) => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://mern-transaction-dashboard.vercel.app/api/transaction`,
        {
          params: {
            search: searchQuery,
            page: currentPage,
            perPage,
            month: selectedMonth,
          },
        }
      );
      // console.log(response);
      setTransactions(response.data.transactions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await axios.get("https://mern-transaction-dashboard.vercel.app/api/TransactionStatistic", {
        params: { month: selectedMonth },
      });
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching transaction statistics:", error.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchStatistics();
  }, [currentPage, searchQuery, selectedMonth]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mx-auto ">
      {/* <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 p-5">Transactions for {selectedMonth}</h1> */}

      <div className="overflow-x-auto mt-8 ">
        <table className="min-w-full bg-white border border-gray-800 shadow-md rounded-lg overflow-hidden divide-y divide-gray-200">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Id</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Image</th>
            </tr>
          </thead>
          {loading ? (
            <div className="text-center items-center">Loading...</div>
          ) : (
            <tbody className="text-gray-800 divide-y divide-gray-300">
              {transactions.map((transaction, index) => (
                <tr
                key={`transaction_${index}`}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="py-3 px-4 whitespace-nowrap">
                  {index + 1}
                  </td>
                  <td className="py-3 px-4">{transaction.title}</td>
                  <td className="py-3 px-4">{transaction.description}</td>
                  <td className="py-3 px-4">${transaction.price.toFixed(2)}</td>
                  <td className="py-3 px-4">{transaction.category}</td>
                  <td className="py-3 px-4">
                    {transaction.sold ? "Sold" : "Not Sold"}
                  </td>
                  <td className="py-2 px-3">
                    <img
                      src={transaction.image}
                      alt="Transaction Image"
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <div className="mt-16 flex justify-between ">
          <p>Page No: {currentPage}</p>
          <div>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          Next
        </button>
        </div>
        <div>
          <p>Per Page: 10</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;

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
