import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import { rupee } from "../../utils/Icons";

export default function History() {
  const { TransactionHistory } = useGlobalContext();

  const [...history] = TransactionHistory();

  return (
    <HistoryStyled>
      <h2> Recent History: </h2>
      {history.map((item) => {
        const { _id, title, amount, type } = item;
        return (
          <div className="history-item" key={_id}>
            <p
              style={{
                color: type === "expense" ? "red" : "var(--color-green)",
              }}
            >
              {title}
            </p>
            <p
              style={{
                color: type === "expense" ? "red" : "var(--color-green)",
              }}
            >
              {/* {rupee} */}
              {type === "expense"
                ? `-${amount === 0 ? amount : 0}`
                : `+${!amount === 0 ? amount : 0}`}
            </p>
          </div>
        );
      })}
    </HistoryStyled>
  );
}

const HistoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .history-item {
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
