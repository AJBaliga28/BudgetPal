import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layout";
import { useGlobalContext } from "../../context/GlobalContext";
import ExpenseItem from "./ExpenseItem";
import ExpenseForm from "../Form/ExpenseForm";

const ExpenseStyled = styled.div`
  display: flex;
  overflow: auto;

  .expense-content {
    gap: 2rem;
    display: flex;
    .form-container {
    }
    .expenses {
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

  .total-expense {
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

export default function Expense() {
  const {
    addExpense,
    expenses,
    getExpenses,
    deleteExpense,
    error,
    totalExpenses,
  } = useGlobalContext();
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  useEffect(() => {
    getExpenses();
  }, []);

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      setFeedbackMessage("Expense item successfully deleted!");
    } catch (err) {
      setFeedbackMessage("Failed to delete the expense item.");
    }
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>Expense</h1>
        <h2 className="total-expense">
          Total Expense: <span> ₹{totalExpenses()} </span>
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

        <div className="expense-content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="expenses">
            {expenses.map((expenseItem) => {
              const { _id, title, amount, date, category, description, type } =
                expenseItem;
              return (
                <ExpenseItem
                  key={_id}
                  id={_id}
                  title={title}
                  amount={amount}
                  date={date}
                  category={category}
                  description={description}
                  indicatorColor="var(--color-red)"
                  type={type}
                  deleteItem={handleDeleteExpense}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </ExpenseStyled>
  );
}
