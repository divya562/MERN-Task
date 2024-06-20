import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

const BarChart = ({ selectedMonth }) => {
  const [barChartData, setBarChartData] = useState({});
  const chartRef = useRef(null); 

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const response = await axios.get(
<<<<<<< HEAD
          "http://localhost:5000/api/bar-chart",
=======
          `https://mern-transaction-dashboard.vercel.app/api/bar-chart`,
>>>>>>> 73c48384a2adbaada5aec838dae5b3582c5ab9b2
          {
            params: { month: selectedMonth },
          }
        );
        setBarChartData(response.data);
      } catch (error) {
        console.error("Error fetching bar chart data:", error.message);
      }
    };

    fetchBarChartData();
  }, [selectedMonth]);

  useEffect(() => {
    if (Object.keys(barChartData).length !== 0) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById("barChart").getContext("2d");
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(barChartData),
          datasets: [
            {
              label: `Items in ${selectedMonth}`,
              data: Object.values(barChartData),
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              stepSize: 20,
              title: {
                display: true,
                text: "Number of Items",
              },
              ticks: {
                precision: 0, 
                callback: function (value) {
                  return Number.isInteger(value) ? value : ""; 
                },
              },
            },
            x: {
              title: {
                display: true,
                text: "Price Range",
              },
            },
          },
        },
      });
    }

 
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [barChartData, selectedMonth]);

  return (
    // <div className="flex justify-center mt-10">
    <div className="bg-white border border-gray-300 shadow-md rounded-lg p-8 w-full md:w-2/3 lg:w-1/2">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Bar Chart for {selectedMonth}
      </h2>
      <canvas id="barChart" width="400" height="300"></canvas>
    </div>
    // </div>
  );
};

export default BarChart;
