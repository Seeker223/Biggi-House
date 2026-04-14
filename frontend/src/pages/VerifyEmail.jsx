import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Container from "../components/Container";
import { verifyEmailOtp, resendVerification } from "../services/api";
import { useAuth } from "../utils/AuthContext";

const Wrapper = styled(Container)`
  padding: 60px 0;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  width: min(480px, 100%);
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

const GhostButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  font-weight: 600;
  margin-top: 10px;
`;

export default function VerifyEmail() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: state?.email || "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleVerify = (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!form.email || !form.otp) {
      setError("Email and OTP are required.");
      return;
    }
    setLoading(true);
    verifyEmailOtp({ email: form.email, otp: form.otp })
      .then((data) => {
        if (data.token && data.user) {
          login(data.user, data.token, data.refreshToken);
          navigate("/dashboard");
          return;
        }
        setMessage(data.message || "Email verified successfully.");
      })
      .catch((err) => setError(err.message || "Verification failed."))
      .finally(() => setLoading(false));
  };

  const handleResend = () => {
    setError("");
    setMessage("");
    if (!form.email) {
      setError("Email is required.");
      return;
    }
    setLoading(true);
    resendVerification({ email: form.email })
      .then((data) => setMessage(data.message || "Verification code sent."))
      .catch((err) => setError(err.message || "Unable to resend code."))
      .finally(() => setLoading(false));
  };

  return (
    <Wrapper>
      <Card>
        <Title>Verify your email</Title>
        <Sub>Enter the 6‑digit code sent to your email address.</Sub>
        <form onSubmit={handleVerify}>
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
            <Label>OTP code</Label>
            <Input
              name="otp"
              placeholder="123456"
              value={form.otp}
              onChange={handleChange}
            />
          </Field>
          {error && <p style={{ color: "#c02626" }}>{error}</p>}
          {message && <p style={{ color: "#15803d" }}>{message}</p>}
          <Button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify email"}
          </Button>
        </form>
        <GhostButton type="button" onClick={handleResend} disabled={loading}>
          Resend code
        </GhostButton>
      </Card>
    </Wrapper>
  );
}
