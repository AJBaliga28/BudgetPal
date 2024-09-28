// Orb.js
import React from "react";
import styled, { keyframes } from "styled-components";
import { useWindowSize } from "../../utils/useWindowSize";

export default function Orb() {
  const { width, height } = useWindowSize();

  // console.log(width, height);

  // Move the keyframes and styled component inside the component so they
  // re-render when `width` and `height` change
  const moveOrb = keyframes`
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(${width / 1.2}px, ${height / 1.5}px);
    }
    100% {
      transform: translate(0, 0);
    }
  `;

  const OrbStyled = styled.div`
    width: 70vh;
    height: 80vh;
    position: absolute;
    border-radius: 50%;
    margin-left: -37vh;
    margin-top: -37vh;
    background: linear-gradient(180deg, #f56692 0%, #f2994a 100%);
    filter: blur(500px);
    animation: ${moveOrb} 15s alternate linear infinite;
  `;

  return <OrbStyled />;
}
