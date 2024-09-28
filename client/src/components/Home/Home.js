// Home.js
import { Link } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  return (
    <HomeStyled>
      <div className="content">
        <h1>BudgetPal</h1>
        <p className="home-text">
          Your personal finance manager. Track your income and expenses
          effortlessly.
        </p>

        <p className="home-text">
          Stay on top of your budget with easy-to-use tools.
        </p>
        <Link to="/signup">
          <button>Get Started</button>
        </Link>
      </div>
    </HomeStyled>
  );
};

export default Home;

const HomeStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .content {
    border: 2px solid #fff;
    padding: 12rem;
    border-radius: 30px;
    text-align: center;
    h1 {
      font-size: 4rem;
      color: #fff;
    }
    .home-text {
      font-size: 1.5rem;
      margin: 10px 0;
      color: #fff;
    }
    button {
      padding: 10px 20px;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1.2rem;

      &:hover {
        font-size: 1.5rem;
        background-color: #449d48;
      }
    }
  }
`;
