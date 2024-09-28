import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layout";
import Chart from "../Chart/Chart";
import { rupee } from "../../utils/Icons";
import { useGlobalContext } from "../../context/GlobalContext";
import History from "../History/History";

const DashboardStyled = styled.div`
  .stats-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;

    .chart-container {
      grid-column: 1/4;
      height: 400px;

      .amount-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 2rem;

        .income,
        .expenses {
          grid-column: span 2;
          align-items: center;
        }

        .income,
        .expenses,
        .balance {
          background: #fcf6f9;
          border: 2px solid #fff;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          padding: 1rem;
          border-radius: 20px;

          p {
            font-size: 3.5rem;
            font-weight: 700;
          }
        }

        .balance {
          grid-column: 2 / 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          p {
            color: var(--color-green);
            opacity: 0.6;
            font-size: 4.5rem;
          }
        }
      }
    }

    .history-container {
      grid-column: 4 / -1;

      h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .salary-title,
      .expenses-title {
        font-size: 1.2rem;

        span {
          font-size: 1.5rem;
        }
      }

      .salary-item,
      .expenses-item {
        background: #fcf6f9;
        border: 2px solid #fff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
          font-weight: 600;
          font-size: 1.6rem;
        }
      }
    }
  }
`;

export default function Dashboard() {
  const {
    totalIncome,
    totalExpenses,
    totalBalance,
    getIncome,
    getExpenses,
    income,
    expenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncome();
    getExpenses();
  }, []);
  return (
    <DashboardStyled>
      <InnerLayout>
        <h1> All Transactions: </h1>
        <div className="stats-container">
          <div className="chart-container">
            <Chart />

            <div className="amount-container">
              <div className="income">
                <h2> Total Income: </h2>
                <p>
                  {rupee} {totalIncome()}
                </p>
              </div>

              <div className="expenses">
                <h2> Total Expenses: </h2>
                <p>
                  {rupee} {totalExpenses()}
                </p>
              </div>

              <div className="balance">
                <h2> Total Balance: </h2>
                <p>
                  {rupee} {totalBalance()}
                </p>
              </div>
            </div>
          </div>
          <div className="history-container">
            <History />
            <h2 className="salary-title">
              Min <span>Salary</span> Max
            </h2>
            <div className="salary-item">
              <p>
                {income.length
                  ? Math.min(...income.map((item) => item.amount))
                  : 0}
              </p>
              <p>
                {income.length
                  ? Math.max(...income.map((item) => item.amount))
                  : 0}
              </p>
            </div>

            <h2 className="expenses-title">
              Min <span>Expenses</span> Max
            </h2>

            <div className="expenses-item">
              <p>
                {expenses.length
                  ? Math.min(...expenses.map((item) => item.amount))
                  : 0}
              </p>
              <p>
                {expenses.length
                  ? Math.max(...expenses.map((item) => item.amount))
                  : 0}
              </p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}
