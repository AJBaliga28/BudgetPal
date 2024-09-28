// NotFound.js
import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
  return (
    <NotFoundStyled>
      <div className="content">
        <h1>404 Error</h1>
        <p>Page Not Found</p>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/">
          <button>Go Back Home</button>
        </Link>
      </div>
    </NotFoundStyled>
  );
};

export default NotFound;

const NotFoundStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  //   background-color: #183a45;

  .content {
    text-align: center;
    h1 {
      font-size: 4rem;
      color: #fff;
    }
    p {
      font-size: 1.5rem;
      margin: 10px 0;
      color: #fff;
      transition: margin-left 0.5s ease-in;
    }
    button {
      padding: 10px 20px;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1.2rem;
    }
  }
`;
