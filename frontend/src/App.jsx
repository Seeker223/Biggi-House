import { Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Houses from "./pages/Houses";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { getStoredUser } from "./utils/auth";

const AppShell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding: 0 0 64px;
`;

function App() {
  const user = getStoredUser();
  return (
    <AppShell>
      <Navbar />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/houses" element={<Houses />} />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" replace />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Main>
    </AppShell>
  );
}

export default App;
