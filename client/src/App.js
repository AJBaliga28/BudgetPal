// App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import MainEntry from "./components/Main/MainEntry";
import AuthLayout from "./components/Auth/AuthLayout";
import NotFound from "./components/Auth/NotFound";
import { useAuth } from "./context/AuthContext";
import styled from "styled-components";
import bg from "./img/green-bg.jpg";
import Orb from "./components/Orb/Orb";
import { useMemo } from "react";

function AppWrapper() {
  const { user } = useAuth();
  const location = useLocation();
  const OrbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AppStyled>
      {location.pathname !== "/" && OrbMemo}
      <Routes>
        {/* Landing Home Route */}
        <Route path="/" element={<Home />} />
        {/* Auth Routes */}
        <Route
          path="/signup"
          element={
            <AuthLayout>
              <Signup />
            </AuthLayout>
          }
        />
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        {/* Main App */}
        <Route
          path="/home"
          element={user ? <MainEntry /> : <Navigate to="/login" />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background: url(${bg});
  background-size: cover;
  position: relative;
`;

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
