import styled from "styled-components";
import Container from "../components/Container";
import { Link } from "react-router-dom";

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
  margin-bottom: 22px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
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
`;

const FooterText = styled.p`
  margin-top: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
`;

export default function Signup() {
  return (
    <Wrapper>
      <Card>
        <Title>Create your account</Title>
        <Sub>Start your savings journey with BiggiHouse.</Sub>
        <Row>
          <Field>
            <Label>First name</Label>
            <Input placeholder="Ada" />
          </Field>
          <Field>
            <Label>Last name</Label>
            <Input placeholder="Obi" />
          </Field>
        </Row>
        <Field>
          <Label>Email address</Label>
          <Input type="email" placeholder="you@example.com" />
        </Field>
        <Field>
          <Label>Password</Label>
          <Input type="password" placeholder="Create password" />
        </Field>
        <Button>Create account</Button>
        <FooterText>
          Already have an account? <Link to="/login">Login</Link>
        </FooterText>
      </Card>
    </Wrapper>
  );
}
