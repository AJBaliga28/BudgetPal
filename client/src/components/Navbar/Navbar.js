import React from "react";
import styled from "styled-components";
import avatar from "../../img/avatar.png";
import { MenuItems } from "../../utils/MenuItems";
import { signout } from "../../utils/Icons";
import { useAuth } from "../../context/AuthContext";

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100%;
  border: 3px solid #fff;
  border-radius: 32px;
  backdrop-filter: blur(4.5px);
  background: rgba(252, 246, 249, 0.78);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  z-index: 5;

  .user-container {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #fff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }

    h2 {
      color: rgba(34, 34, 96, 1);
    }
    p {
      color: rgba(34, 34, 96, 0.6);
    }
  }

  .menu-items {
    display: flex;
    flex: 1;
    flex-direction: column;

    li {
      display: grid;
      grid-template-columns: 50px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      opacity: 2.5;
      padding-left: 1rem;
      position: relative;

      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
      }
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;

    i {
      color: rgba(34, 34, 96, 1) !important;
    }

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px; /* Adjust the width of the bar */
      height: 100%;
      background: #222260; /* Color of the bar */
      border-radius: 0px 10px 10px 0;
    }
  }

  .bottom-nav li {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

export default function Navbar({ active, setActive }) {
  const { user, logout } = useAuth();

  // Sign out handler
  const handleSignOut = () => {
    logout(); // Call the logout function from AuthContext
  };

  return (
    <NavStyled>
      <div className="user-container">
        <img src={avatar} alt="user avatar" />
        <div className="text">
          <h2>{user ? user.username : "Guest"}</h2>
          {user ? <p>Profile</p> : <p>Please Login</p>}
        </div>
      </div>
      <ul className="menu-items">
        {MenuItems.map((ele) => {
          return (
            <li
              key={ele.id}
              onClick={() => setActive(ele.id)}
              className={active === ele.id ? "active" : ""}
            >
              {ele.icon}
              {ele.title}
            </li>
          );
        })}
      </ul>
      <div className="bottom-nav">
        <li onClick={handleSignOut}>
          {signout}
          Sign Out
        </li>
      </div>
    </NavStyled>
  );
}
