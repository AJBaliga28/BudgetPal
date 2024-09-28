import React from "react";
import styled from "styled-components";

const ButtonStyled = styled.button`
  outline: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  background-color: ${(props) => props.bg || "var(--primary-color1)"};
  padding: ${(props) => props.bPad || "1rem"};
  border-radius: ${(props) => props.bRad || "50%"};
  color: ${(props) => props.color || "#FFF"};

  &:hover {
    background-color: ${(props) => props.hColor || "var(--color-green)"};
  }
`;

export default function Button({
  name,
  icon,
  onClick,
  bg,
  bPad,
  color,
  bRad,
  iColor,
  hColor,
}) {
  return (
    <ButtonStyled
      bg={bg}
      bPad={bPad}
      bRad={bRad}
      color={color}
      hColor={hColor}
      onClick={onClick}
    >
      <span style={{ color: iColor }}>{icon}</span>{" "}
      {/* Ensures icon color is applied */}
      {name}
    </ButtonStyled>
  );
}
