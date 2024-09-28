import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/GlobalContext";
import Button from "../buttons/Button";
import { plus } from "../../utils/Icons";

export default function ExpenseForm() {
  const { addExpense, getExpenses } = useGlobalContext();
  const [input, setInput] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
    type: "expense",
  });

  const { title, amount, date, category, description } = input;

  const handleChange = (name) => (e) => {
    setInput({ ...input, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format the amount as a float
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      alert("Amount must be a valid number.");
      return;
    }

    // Format the date as 'YYYY-MM-DD'
    const formattedDate = date ? date.toISOString().split("T")[0] : "";

    try {
      console.log("EForm: ", input);
      const response = await addExpense({
        ...input,
        amount: parsedAmount, // Send amount as a number
        date: formattedDate, // Send date in the correct format
      });

      if (response.status === 200) {
        alert("Expense added successfully!");
        setInput({
          title: "",
          amount: "",
          date: "",
          category: "",
          description: "",
        });
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add expense.");
    }

    getExpenses();
  };

  return (
    <ExpenseFormStyled onSubmit={handleSubmit}>
      <div className="input-control">
        <input
          type="text"
          value={title}
          name="title"
          placeholder="Title: "
          onChange={handleChange("title")}
          required
        />
      </div>

      <div className="input-control">
        <input
          type="text"
          value={amount}
          name="amount"
          placeholder="Amount: "
          onChange={handleChange("amount")}
          required
        />
      </div>

      <div className="input-control">
        <DatePicker
          id="date"
          placeholderText="Enter a date: "
          selected={date}
          dateFormat={"yyyy-MM-dd"}
          onChange={(date) => setInput({ ...input, date })}
          required
        />
      </div>

      <div className="selects input-control">
        <select
          required
          value={category}
          name="category"
          id="category"
          onChange={handleChange("category")}
        >
          <option value="" disabled>
            Select Option
          </option>
          <option value="education">Education</option>
          <option value="groceries">Groceries</option>
          <option value="health">Health</option>
          <option value="subscriptions">Subscriptions</option>
          <option value="takeaways">Takeaways</option>
          <option value="clothing">Clothing</option>
          <option value="travelling">Travelling</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="input-control">
        <textarea
          value={description}
          name="description"
          placeholder="Add a Description: "
          onChange={handleChange("description")}
          cols="30"
          rows="4"
          required
        />
        <div className="submit-btn">
          <Button
            name={"Add"}
            icon={plus}
            bg={"var(--color-accent)"}
            bPad={".8rem 1.6rem"}
            color={"#fff"}
            bRad={"30px"}
          />
        </div>
      </div>
    </ExpenseFormStyled>
  );
}

const ExpenseFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);

    &::placeholder {
      color: rgba(34, 34, 96, 0.6);
    }
  }

  .input-control {
    input {
      width: 100%;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &::focus,
      &::active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    margin-top: 1rem;
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;
