import React from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import { DateFormat } from "../../utils/DateFormat";

ChartJs.register({
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
});

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #fff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
`;

export default function Chart() {
  const { income, expenses } = useGlobalContext();

  // Handle case where data is not yet available
  if (!income || !expenses) {
    return <p>Loading data...</p>;
  }

  // Ensure income and expenses are non-empty arrays before proceeding
  if (income.length === 0 && expenses.length === 0) {
    return <p>No data available to display</p>;
  }

  const data = {
    labels: income.map((ele) => DateFormat(ele.date)), // Format dates properly
    datasets: [
      {
        label: "Income",
        data: income.map((inc) => inc.amount), // Ensure correct access to the amount key
        backgroundColor: "green",
        borderColor: "green", // Add borderColor to make the line visible
        // fill: false, // Disable fill to show the line only
        tension: 0.2, // Adds smooth curves to the line
      },
      {
        label: "Expenses",
        data: expenses.map((exp) => exp.amount), // Ensure correct access to the amount key
        backgroundColor: "red",
        borderColor: "red", // Add borderColor to make the line visible
        // fill: false, // Disable fill to show the line only
        tension: 0.2, // Adds smooth curves to the line
      },
    ],
  };

  return (
    <ChartStyled>
      <Line data={data} options={{ responsive: true }} />{" "}
      {/* Render the chart */}
    </ChartStyled>
  );
}
