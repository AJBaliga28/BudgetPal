import React from "react";
import styled from "styled-components";
import {
  book,
  calendar,
  card,
  circle,
  clothing,
  comment,
  food,
  freelance,
  medical,
  money,
  piggy,
  rupee,
  stocks,
  takeaway,
  trash,
  tv,
  yt,
} from "../../utils/Icons";
import Button from "../buttons/Button";
import { DateFormat } from "../../utils/DateFormat";

export default function IncomeItem({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  indicatorColor,
  type,
}) {
  const IncomeCategoryIcon = () => {
    console.log(type, category);
    switch (category) {
      case "salary":
        return money;
      case "freelancing":
        return freelance;

      case "stocks":
        return stocks;
      case "bank":
        return card;
      case "youtube":
        return yt;
      case "other":
        return piggy;
      default:
        return "";
    }
  };

  const ExpenseCategoryIcon = () => {
    console.log(type, category);
    switch (category) {
      case "education":
        return book;
      case "groceries":
        return food;
      case "health":
        return medical;
      case "subscriptions":
        return tv;
      case "takeawayas":
        return takeaway;
      case "clothing":
        return clothing;
      case "travelling":
        return freelance;
      case "other":
        return circle;
      default:
        return "";
    }
  };

  return (
    <IncomeItemStyled indicator={indicatorColor}>
      <div className="icon">
        {type === "income" ? IncomeCategoryIcon() : ExpenseCategoryIcon()}
      </div>

      <div className="content">
        <h5> {title} </h5>
        <div className="inner-content">
          <div className="text">
            <p>
              {rupee} {amount}
            </p>
            <p>
              {calendar} {DateFormat(date)}
            </p>
            <p>
              {comment} {description}
            </p>
          </div>
          <div className="btn-container">
            <Button
              icon={trash}
              bPad={"1.2rem"}
              bRad={"50%"}
              bg={"var(--primary-color1)"}
              color={"#FFF"}
              onClick={() => deleteItem(id)}
              iColor={"#fff"}
              hColor={"var(--color-delete)"}
            />
          </div>
        </div>
      </div>
    </IncomeItemStyled>
  );
}

const IncomeItemStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: #222260;

  .icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #fff;

    i {
      font-size: 2.6rem;
    }
  }

  .content {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.2rem;

    h5 {
      font-size: 1.3rem;
      padding-left: 2rem;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: ${(props) => props.indicator};
      }
    }
  }

  .inner-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      p {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--primary-color1);
        opacity: 0.8;
      }
    }

    .btn-container {
      display: flex;
      align-items: center;
      justify-content: center; /* Centering the button */
      padding: 0.5rem;
      width: 50px; /* Fixed width */
      height: 50px; /* Fixed height */
    }
  }
`;
