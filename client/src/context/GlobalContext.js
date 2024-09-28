import { useContext, createContext, useState } from "react";
import axios from "axios";

const BASE_URL =
  `${process.env.REACT_APP_API_URL}/api/users` || "http://localhost:5000/api/";
const token = localStorage.getItem("token"); // Retrieve token from local storage
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Set Authorization header

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  const addIncome = async (income) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/income/add-income`,
        income
      );
      return response; // Return the response so it can be handled in Form.js
    } catch (error) {
      setError(error.response?.data || "An error occurred");
      throw error; // Throw the error to handle it in the form
    }
  };

  const getIncome = async (income) => {
    try {
      const response = await axios.get(`${BASE_URL}/income/get-income`, income);
      console.log(response.data);
      setIncome(response.data);
      return response; // Return the response so it can be handled in Form.js
    } catch (error) {
      setError(error.response?.data || "An error occurred");
      throw error; // Throw the error to handle it in the form
    }
  };

  const deleteIncome = async (id) => {
    setError(null); // Clear previous errors before starting new action
    try {
      const response = await axios.delete(
        `${BASE_URL}/income/delete-income/${id}`
      );
      setIncome(income.filter((item) => item._id !== id)); // Optimistic UI update
      return response;
    } catch (error) {
      setError(error.response?.data || "Failed to delete income item");
      throw error;
    }
  };

  const totalIncome = () => {
    let totalAmt = 0;
    income.forEach((ele) => {
      totalAmt += ele.amount;
    });
    return totalAmt;
  };

  // Expenses functionalities
  const addExpense = async (expense) => {
    try {
      console.log(expense);
      const response = await axios.post(
        `${BASE_URL}/expenses/add-expenses`,
        expense
      );
      return response;
    } catch (error) {
      setError(error.response?.data || "An error occurred");
      throw error;
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/expenses/get-expenses`);
      setExpenses(response.data);
      return response;
    } catch (error) {
      setError(error.response?.data || "An error occurred");
      throw error;
    }
  };

  const deleteExpense = async (id) => {
    setError(null);
    try {
      const response = await axios.delete(
        `${BASE_URL}/expenses/delete-expenses/${id}`
      );
      setExpenses(expenses.filter((item) => item._id !== id));
      return response;
    } catch (error) {
      setError(error.response?.data || "Failed to delete expense item");
      throw error;
    }
  };

  const totalExpenses = () => {
    let totalAmt = 0;
    expenses.forEach((ele) => {
      totalAmt += ele.amount;
    });
    return totalAmt;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const TransactionHistory = () => {
    const history = [...income, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncome,
        income,
        deleteIncome,
        error,
        totalIncome,
        addExpense,
        getExpenses,
        expenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        TransactionHistory,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
