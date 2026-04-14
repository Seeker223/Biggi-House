import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import HouseCard from "../components/HouseCard";
import { houses } from "../data/houses";
import {
  HouseIcon,
  WalletIcon,
  PayoutIcon,
  ShieldIcon,
} from "../components/Icons";
import fintechMockup from "../assets/biggiHouse fintech platform interface.png";

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

const Mockup = styled.img`
  width: 100%;
  border-radius: 22px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
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
  margin-bottom: 18px;
`;

const PoweredBy = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.soft};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 24px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  background: ${({ theme }) => theme.gradients.brand};
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

const StepsRow = styled(Container)`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  align-items: center;
  position: relative;

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
  display: grid;
  gap: 8px;
`;

const StepIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.soft};
  display: grid;
  place-items: center;
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  left: 33%;
  width: 34%;
  height: 2px;
  background: ${({ theme }) => theme.colors.soft};
  transform: translateY(-50%);

  &::after,
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    width: 10px;
    height: 10px;
    border-right: 2px solid ${({ theme }) => theme.colors.primary};
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
    transform: translateY(-50%) rotate(-45deg);
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const TrustText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 18px;
  font-size: 14px;
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
  background: ${({ theme }) => theme.gradients.brand};
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

const Partners = styled.section`
  padding: 40px 0 20px;
`;

const PartnerRow = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

const PartnerTitle = styled.p`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.muted};
`;

const PartnerLogos = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const PartnerBadge = styled.div`
  padding: 10px 16px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-weight: 600;
`;

const Footer = styled.footer`
  padding: 36px 0 50px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const FooterGrid = styled(Container)`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const FooterBrand = styled.div`
  display: grid;
  gap: 8px;
  color: ${({ theme }) => theme.colors.muted};
`;

const FooterLogo = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 20px;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const Socials = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;

  @media (max-width: 900px) {
    justify-content: flex-start;
  }
`;

const SocialChip = styled.span`
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  font-weight: 600;
  font-size: 13px;
`;

export default function Home() {
  const navigate = useNavigate();
  const preview = houses.slice(0, 3);

  return (
    <>
      <HeroSection>
        <HeroGrid>
          <div>
            <Title>Welcome to Biggi House</Title>
            <Sub>
              BiggiHouse is a smart group savings platform. Pick a house,
              contribute weekly, and receive scheduled payouts transparently.
            </Sub>
            <PoweredBy>Powered by Biggi Data bundles services</PoweredBy>
            <ButtonRow>
              <PrimaryButton to="/houses">Join a House</PrimaryButton>
              <GhostButton to="/signup">Create Account</GhostButton>
            </ButtonRow>
          </div>
          <HeroCard>
            <Mockup
              src={fintechMockup}
              alt="biggiHouse fintech platform interface preview"
            />
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
        <StepsRow>
          <Arrow />
          {[
            {
              icon: <HouseIcon size={28} />,
              title: "Join a house",
              text: "Select a contribution plan that fits you.",
            },
            {
              icon: <WalletIcon size={28} />,
              title: "Contribute weekly",
              text: "Pay your contribution securely each cycle.",
            },
            {
              icon: <PayoutIcon size={28} />,
              title: "Receive a payout",
              text: "Get your full payout when it is your turn.",
            },
          ].map((step) => (
            <StepCard key={step.title}>
              <StepIcon>{step.icon}</StepIcon>
              <h3>{step.title}</h3>
              <p style={{ color: "#5b6475" }}>{step.text}</p>
            </StepCard>
          ))}
        </StepsRow>
        <TrustText>Secured payments · Powered by Flutterwave</TrustText>
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
            <HouseCard
              key={house.id}
              house={house}
              onJoin={() => navigate("/houses")}
            />
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

      <Section>
        <Container>
          <SectionTitle>Trust and safety</SectionTitle>
          <SectionSub>
            Transparent cycles, verified payments, and dedicated support.
          </SectionSub>
          <div style={{ display: "grid", gap: "18px" }}>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <ShieldIcon size={32} />
              <div>
                <strong>Protected contributions</strong>
                <div style={{ color: "#5b6475" }}>
                  We verify every payment before it enters a house.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Partners>
        <PartnerRow>
          <PartnerTitle>Trusted payments</PartnerTitle>
          <PartnerLogos>
            <PartnerBadge>Flutterwave</PartnerBadge>
            <PartnerBadge>Paystack</PartnerBadge>
          </PartnerLogos>
        </PartnerRow>
      </Partners>

      <Footer>
        <FooterGrid>
          <FooterBrand>
            <FooterLogo>biggiHouse</FooterLogo>
            <p>Your trusted savings platform.</p>
            <p style={{ color: "#3b82f6", fontWeight: 600 }}>
              Powered by Biggi Data bundles services
            </p>
          </FooterBrand>
          <FooterLinks>
            <Link to="#">Terms</Link>
            <Link to="#">Privacy</Link>
            <Link to="#">Contact</Link>
          </FooterLinks>
          <Socials>
            <SocialChip>Facebook</SocialChip>
            <SocialChip>Twitter</SocialChip>
            <SocialChip>Instagram</SocialChip>
          </Socials>
        </FooterGrid>
      </Footer>
    </>
  );
}
