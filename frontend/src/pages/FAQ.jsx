import styled from "styled-components";
import Container from "../components/Container";

const Wrapper = styled(Container)`
  padding: 40px 0 60px;
`;

const Header = styled.div`
  display: grid;
  gap: 10px;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 32px;
`;

const Sub = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  max-width: 640px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: 20px;
`;

const Question = styled.h3`
  font-size: 16px;
  margin-bottom: 8px;
`;

const Answer = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
  line-height: 1.6;
`;

const Cta = styled.div`
  margin-top: 30px;
  background: ${({ theme }) => theme.gradients.brand};
  color: #fff;
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const CtaTitle = styled.h3`
  font-size: 20px;
`;

const CtaButton = styled.a`
  background: #fff;
  color: ${({ theme }) => theme.colors.primary};
  padding: 10px 16px;
  border-radius: 999px;
  font-weight: 600;
`;

export default function FAQ() {
  const items = [
    {
      q: "How do houses work?",
      a: "Each house has a minimum contribution. Once you join, you contribute monthly and follow a clear payout schedule.",
    },
    {
      q: "How many people can join a house?",
      a: "Houses are open to multiple contributors. Your dashboard tracks participation and payout progress.",
    },
    {
      q: "How are payouts handled?",
      a: "Payouts are scheduled and transparent. You can see your position and the next payout date in your dashboard.",
    },
    {
      q: "Can I join more than one house?",
      a: "Yes. You can join multiple houses to scale your savings goals.",
    },
    {
      q: "How do I verify my payments?",
      a: "Every payment is verified before it is added to a house. Your wallet and history confirm the status.",
    },
    {
      q: "Is my money safe?",
      a: "We apply verified payment checks, transparent tracking, and clear activity logs to keep your savings protected.",
    },
  ];

  return (
    <Wrapper>
      <Header>
        <Title>Frequently Asked Questions</Title>
        <Sub>
          Everything you need to know about BiggiHouse cycles, payments, and
          payouts.
        </Sub>
      </Header>
      <Grid>
        {items.map((item) => (
          <Card key={item.q}>
            <Question>{item.q}</Question>
            <Answer>{item.a}</Answer>
          </Card>
        ))}
      </Grid>
      <Cta>
        <div>
          <CtaTitle>Still have questions?</CtaTitle>
          <p style={{ opacity: 0.85 }}>
            Reach out and our support team will respond quickly.
          </p>
        </div>
        <CtaButton href="#">Contact support</CtaButton>
      </Cta>
    </Wrapper>
  );
}
