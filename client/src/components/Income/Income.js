import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layout";
import { useGlobalContext } from "../../context/GlobalContext";
import Form from "../Form/IncomeForm";
import IncomeItem from "./IncomeItem";

const IncomeStyled = styled.div`
  display: flex;
  overflow: auto;

  .income-content {
    gap: 2rem;
    display: flex;
    .form-container {
    }
    .incomes {
      flex: 1;
    }
  }

  .feedback {
    margin: 1rem 0;
    padding: 0.8rem 1.2rem;
    border-radius: 5px;
    background-color: #f0f4f8;
    color: #333;
  }

  .feedback-success {
    background-color: #d4edda;
    color: #155724;
  }

  .feedback-error {
    background-color: #f8d7da;
    color: #721c24;
  }

  .total-income {
    display: flex;
    justify-content: center;
    background: #fcf6f9;
    border: 2px solid #fff;
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.2rem;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
`;

export default function Income() {
  const { addIncome, income, getIncome, deleteIncome, error, totalIncome } =
    useGlobalContext();
  const [feedbackMessage, setFeedbackMessage] = useState(null); // State for success feedback

  useEffect(() => {
    getIncome();
  }, []);

  // Function to handle item deletion and provide feedback
  const handleDeleteIncome = async (id) => {
    try {
      await deleteIncome(id);
      setFeedbackMessage("Income item successfully deleted!");
    } catch (err) {
      setFeedbackMessage("Failed to delete the income item.");
    }

    // Clear the feedback message after a few seconds
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Income</h1>
        <h2 className="total-income">
          Total Income: <span> ₹{totalIncome()} </span>
        </h2>
        {/* Feedback message */}
        {feedbackMessage && (
          <div
            className={`feedback ${
              error ? "feedback-error" : "feedback-success"
            }`}
          >
            {feedbackMessage}
          </div>
        )}

        {/* Error message */}
        {error && <div className="feedback feedback-error">Error: {error}</div>}

        <div className="income-content">
          <div className="form-container">
            <Form />
          </div>
          <div className="incomes">
            {income.map((incomeItem) => {
              const { _id, title, amount, date, category, description, type } =
                incomeItem;
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  amount={amount}
                  date={date}
                  category={category}
                  description={description}
                  indicatorColor="var(--color-green)"
                  type={type}
                  deleteItem={handleDeleteIncome} // Use updated delete handler
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
}
