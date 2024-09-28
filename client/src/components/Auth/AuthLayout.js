// AuthLayout.js
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const AuthLayout = ({ children }) => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <AuthStyled>
      <div className={`auth-info ${isLogin ? "right" : "left"}`}>
        <h1>BudgetPal</h1>
        <p className="authlayout-text">Your personal finance manager.</p>
        {isLogin ? (
          <p className="white-text">
            Don't have an account?
            <Link
              to="/signup"
              style={{ color: "white", textDecoration: "none" }}
            >
              &nbsp;Sign up here
            </Link>
          </p>
        ) : (
          <p className="white-text">
            Already have an account?
            <Link
              to="/login"
              style={{ color: "white", textDecoration: "none" }}
            >
              &nbsp;Log in here
            </Link>
          </p>
        )}
      </div>
      <div className={`auth-form ${isLogin ? "left" : "right"}`}>
        {children}
      </div>
    </AuthStyled>
  );
};

export default AuthLayout;

const AuthStyled = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;

  .auth-info,
  .auth-form {
    width: 50%;
    padding: 40px;
    text-align: center;
    transition: all 1.5s ease-out;
  }

  .auth-info {
    border: 3px solid #fff;
    border-radius: 32px;
    backdrop-filter: blur(3px);
    padding: 2rem;
    gap: 2rem;
    // background: rgba(252, 246, 249, 0.78); // Updated background
  }

  .auth-info p a {
    transition: all 0.3s ease-in-out;
    &:hover {
      font-size: 1.4rem; // Increase font size on hover
      text-decoration: none;
    }
  }
  .left {
    order: 1;
  }

  .right {
    order: 2;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  .authlayout-text {
    font-size: 1.2rem;
    margin: 10px 0;
    color: #4caf50;
  }

  .white-text {
    font-size: 1.2rem;
    margin: 10px 0;
    color: #fff;
  }
`;
