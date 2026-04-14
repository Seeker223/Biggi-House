import styled from "styled-components";
import { useState } from "react";
import Container from "../components/Container";
import { forgotPassword } from "../services/api";

const Wrapper = styled(Container)`
  padding: 60px 0;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  width: min(460px, 100%);
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 32px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const Title = styled.h1`
  font-size: 26px;
  margin-bottom: 8px;
`;

const Sub = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 18px;
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
  background: ${({ theme }) => theme.gradients.brand};
  color: #fff;
  font-weight: 600;
  margin-top: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!email) {
      setError("Email is required.");
      return;
    }
    setLoading(true);
    forgotPassword({ email })
      .then((data) => setMessage(data.message || "Check your email for next steps."))
      .catch((err) => setError(err.message || "Request failed."))
      .finally(() => setLoading(false));
  };

  return (
    <Wrapper>
      <Card>
        <Title>Forgot password</Title>
        <Sub>We will send instructions to reset your password.</Sub>
        <form onSubmit={handleSubmit}>
          <Field>
            <Label>Email address</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          {error && <p style={{ color: "#c02626" }}>{error}</p>}
          {message && <p style={{ color: "#15803d" }}>{message}</p>}
          <Button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send reset link"}
          </Button>
        </form>
      </Card>
    </Wrapper>
  );
}
