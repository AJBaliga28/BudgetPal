import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState(null); // Track the error locally
  const { login, loading, error } = useAuth(); // error from context
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timer to clear the error after 5 seconds
    if (error) {
      setLocalError(error);
      const timer = setTimeout(() => {
        setLocalError(null);
      }, 5000);
      return () => clearTimeout(timer); // Clear timer on unmount
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/home");
    } else {
      setLocalError("Login failed. Please try again.");
    }
  };

  const clearErrorOnFocus = () => {
    setLocalError(null); // Clear error when input is focused
  };

  return (
    <LoginFormStyled onSubmit={handleSubmit}>
      <div className="input-control">
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          onFocus={clearErrorOnFocus} // Clear error when this field is focused
          required
        />
      </div>
      <div className="input-control">
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          onFocus={clearErrorOnFocus} // Clear error when this field is focused
          required
        />
      </div>
      <div className="submit-btn">
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
      {localError && <p>{localError}</p>}
    </LoginFormStyled>
  );
};

export default Login;

const LoginFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #fff;
  border-radius: 32px;
  backdrop-filter: blur(3px);
  padding: 2rem;

  input {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);

    &::placeholder {
      color: rgba(34, 34, 96, 0.6);
    }
  }

  .input-control {
    width: 100%;
  }

  .submit-btn button {
    padding: 0.7rem 2rem;
    border-radius: 30px;
    background: #222260;
    color: #fff;
    border: none;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);

    &:hover {
      background: var(--color-green) !important;
    }
  }

  p {
    color: red;
  }
`;
