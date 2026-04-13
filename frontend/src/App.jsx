import { Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Houses from "./pages/Houses";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PaymentSuccess from "./pages/PaymentSuccess";
import Wallet from "./pages/Wallet";
import Profile from "./pages/Profile";
import FAQ from "./pages/FAQ";
import { useAuth } from "./utils/AuthContext";

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
  const { user, loading } = useAuth();
  if (loading) {
    return null;
  }
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
          <Route
            path="/wallet"
            element={user ? <Wallet /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" replace />}
          />
          <Route path="/faq" element={<FAQ />} />
          <Route
            path="/payment-success"
            element={user ? <PaymentSuccess /> : <Navigate to="/login" replace />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Main>
    </AppShell>
  );
}

export default App;
