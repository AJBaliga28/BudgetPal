import React, { useMemo, useState } from "react";
import styled from "styled-components";
import bg from "../../img/green-bg.jpg";
import { MainLayout } from "../../styles/Layout";
import Orb from "../Orb/Orb";
import Navbar from "../Navbar/Navbar";
import Dashboard from "../Dashboard/Dashboard";
import Expenses from "../Expenses/Expenses";
import Income from "../Income/Income";

const MainPartStyled = styled.div`
  height: 100vh;
  background: url(${bg});
  background-size: cover;
  position: relative;

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #fff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default function MainPart() {
  const [active, setActive] = useState(1);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  const OrbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <MainPartStyled>
      {OrbMemo}
      <MainLayout>
        <Navbar active={active} setActive={setActive} />
        <main>{displayData()}</main>
      </MainLayout>
    </MainPartStyled>
  );
}
