import styled from "styled-components";
import { useState } from "react";
import Container from "../components/Container";
import { Link, useNavigate } from "react-router-dom";
import biggiLogo from "../assets/biggiHouse2.png";

const Wrapper = styled(Container)`
  padding: 60px 0;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  width: min(420px, 100%);
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 32px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const Logo = styled.img`
  width: 64px;
  height: 64px;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 26px;
  margin-bottom: 8px;
`;

const Sub = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 22px;
`;

const Field = styled.div`
  display: grid;
  gap: 6px;
  margin-bottom: 14px;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
`;

const Input = styled.input`
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fdfdff;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 600;
  margin-top: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const FooterText = styled.p`
  margin-top: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
`;

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please enter email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem(
        "biggiUser",
        JSON.stringify({ email: form.email, name: "Demo User" })
      );
      setLoading(false);
      navigate("/dashboard");
    }, 900);
  };

  return (
    <Wrapper>
      <Card>
        <Logo src={biggiLogo} alt="biggiHouse logo" />
        <Title>Welcome back</Title>
        <Sub>Sign in to continue your savings cycle.</Sub>
        <form onSubmit={handleSubmit}>
          <Field>
            <Label>Email address</Label>
            <Input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
            />
          </Field>
          {error && (
            <p style={{ color: "#c02626", fontSize: "13px" }}>{error}</p>
          )}
          <Button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </Button>
        </form>
        <FooterText>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </FooterText>
      </Card>
    </Wrapper>
  );
}
