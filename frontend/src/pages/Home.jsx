import styled from "styled-components";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import HouseCard from "../components/HouseCard";
import { houses } from "../data/houses";

const HeroSection = styled.section`
  padding: 70px 0 40px;
`;

const HeroGrid = styled(Container)`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const HeroCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 26px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Title = styled.h1`
  font-size: clamp(2.6rem, 4vw, 3.5rem);
  line-height: 1.05;
  margin-bottom: 16px;
  letter-spacing: -1px;
`;

const Sub = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 1.05rem;
  margin-bottom: 24px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 12px 20px;
  border-radius: 999px;
  font-weight: 600;
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const GhostButton = styled(Link)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 12px 20px;
  border-radius: 999px;
  font-weight: 600;
`;

const StatGrid = styled(Container)`
  margin-top: 26px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 18px;
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const StatValue = styled.div`
  font-size: 22px;
  font-weight: 700;
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
  margin-top: 4px;
`;

const Section = styled.section`
  padding: 46px 0;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 10px;
`;

const SectionSub = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 26px;
`;

const StepsGrid = styled(Container)`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 22px;
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const StepNumber = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.soft};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  margin-bottom: 12px;
`;

const HousesGrid = styled(Container)`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Highlight = styled.div`
  background: linear-gradient(120deg, #1b4db6, #1441a8);
  color: #fff;
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 760px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const HighlightTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 8px;
`;

const HighlightButton = styled(Link)`
  background: #fff;
  color: ${({ theme }) => theme.colors.primary};
  padding: 12px 20px;
  border-radius: 999px;
  font-weight: 600;
`;

export default function Home() {
  const preview = houses.slice(0, 3);

  return (
    <>
      <HeroSection>
        <HeroGrid>
          <div>
            <Title>Save together. Earn together.</Title>
            <Sub>
              BiggiHouse is a smart group savings platform. Pick a house,
              contribute monthly, and receive scheduled payouts transparently.
            </Sub>
            <ButtonRow>
              <PrimaryButton to="/houses">Join a House</PrimaryButton>
              <GhostButton to="/signup">Create Account</GhostButton>
            </ButtonRow>
          </div>
          <HeroCard>
            <h3>Cycle Snapshot</h3>
            <p style={{ color: "#5b6475", margin: "8px 0 16px" }}>
              Track your contributions, payout position, and next cycle date in
              one place.
            </p>
            <div style={{ display: "grid", gap: "12px" }}>
              <div>
                <strong>House 3</strong>
                <div style={{ color: "#5b6475" }}>₦300 minimum • 7/10 members</div>
              </div>
              <div>
                <strong>Next payout</strong>
                <div style={{ color: "#5b6475" }}>June 30, 2026</div>
              </div>
              <div>
                <strong>Position</strong>
                <div style={{ color: "#5b6475" }}>4 of 10 contributors</div>
              </div>
            </div>
          </HeroCard>
        </HeroGrid>

        <StatGrid>
          {[
            { value: "10", label: "Houses live" },
            { value: "₦4.2M", label: "Total payouts" },
            { value: "98%", label: "On-time payouts" },
            { value: "24/7", label: "Support coverage" },
          ].map((stat) => (
            <StatCard key={stat.label}>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatGrid>
      </HeroSection>

      <Section>
        <Container>
          <SectionTitle>How biggiHouse works</SectionTitle>
          <SectionSub>
            Simple steps designed to feel safe, transparent, and consistent.
          </SectionSub>
        </Container>
        <StepsGrid>
          {[
            {
              title: "Join a house",
              text: "Choose the minimum contribution that fits you.",
            },
            {
              title: "Contribute monthly",
              text: "We track your payments and progress for each cycle.",
            },
            {
              title: "Receive payouts",
              text: "Payouts are transparent and scheduled for every cycle.",
            },
          ].map((step, index) => (
            <StepCard key={step.title}>
              <StepNumber>{index + 1}</StepNumber>
              <h3>{step.title}</h3>
              <p style={{ color: "#5b6475", marginTop: "8px" }}>{step.text}</p>
            </StepCard>
          ))}
        </StepsGrid>
      </Section>

      <Section>
        <Container>
          <SectionTitle>Choose a house</SectionTitle>
          <SectionSub>
            Houses are capped at 10 contributors to keep the cycle clear and
            fair.
          </SectionSub>
        </Container>
        <HousesGrid>
          {preview.map((house) => (
            <HouseCard key={house.id} house={house} />
          ))}
        </HousesGrid>
      </Section>

      <Section>
        <Container>
          <Highlight>
            <div>
              <HighlightTitle>Start your savings journey today</HighlightTitle>
              <p style={{ opacity: 0.85 }}>
                Create an account in minutes and join the right house for you.
              </p>
            </div>
            <HighlightButton to="/signup">Get started</HighlightButton>
          </Highlight>
        </Container>
      </Section>
    </>
  );
}
