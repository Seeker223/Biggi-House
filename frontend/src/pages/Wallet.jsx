import styled from "styled-components";
import Container from "../components/Container";
import WalletCard from "../components/WalletCard";

const Wrapper = styled.div`
  min-height: 100vh;
  background: #f3f4f6;
  display: flex;
  justify-content: center;
  padding: 24px 0 60px;
`;

const Phone = styled(Container)`
  max-width: 380px;

  @media (min-width: 900px) {
    max-width: 880px;
  }
`;

const Layout = styled.div`
  display: grid;
  gap: 20px;

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 380px) minmax(0, 1fr);
    gap: 26px;
    align-items: start;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding: 0 4px;
`;

const Burger = styled.div`
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
`;

const HeaderTitle = styled.div`
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 600;
`;

const ActivityTitle = styled.div`
  color: ${({ theme }) => theme.colors.ink};
  font-weight: 600;
  margin: 20px 0 12px;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 12px 0 6px;
`;

const PrimaryButton = styled.button`
  padding: 10px 18px;
  border-radius: 999px;
  border: none;
  background: ${({ theme }) => theme.gradients.brand};
  color: #fff;
  font-weight: 600;
`;

const GhostButton = styled.button`
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  font-weight: 600;
`;

const ActivityPanel = styled.div`
  @media (min-width: 900px) {
    background: #fff;
    border-radius: 18px;
    box-shadow: ${({ theme }) => theme.shadows.card};
    padding: 18px;
  }
`;

const ActivityItem = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  svg {
    width: 18px;
    height: 18px;
  }
  background: ${({ $variant }) =>
    $variant === "green"
      ? "rgba(34, 197, 94, 0.15)"
      : "rgba(59, 130, 246, 0.15)"};
`;

const ItemTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink};
`;

const ItemSub = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`;

const ItemValue = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink};
`;

export default function Wallet() {
  return (
    <Wrapper>
      <Phone>
        <Header>
          <Burger aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </Burger>
          <HeaderTitle>Selection House</HeaderTitle>
        </Header>
        <Layout>
          <div>
            <WalletCard />
            <Actions>
              <PrimaryButton>Deposit</PrimaryButton>
              <GhostButton>Withdraw</GhostButton>
            </Actions>
          </div>
          <ActivityPanel>
            <ActivityTitle>Recent Activity</ActivityTitle>
            <ActivityItem>
              <ItemLeft>
                <IconCircle $variant="green" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 12l4 4 8-8"
                      stroke="#16a34a"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </IconCircle>
                <div>
                  <ItemTitle>Quick Receive</ItemTitle>
                  <ItemSub>Investment</ItemSub>
                </div>
              </ItemLeft>
              <ItemValue>₦15,000</ItemValue>
            </ActivityItem>
            <ActivityItem>
              <ItemLeft>
                <IconCircle $variant="blue" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 4l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8L12 4z"
                      stroke="#2563eb"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                </IconCircle>
                <div>
                  <ItemTitle>Course House</ItemTitle>
                  <ItemSub>Payment</ItemSub>
                </div>
              </ItemLeft>
              <ItemValue>₦15,000</ItemValue>
            </ActivityItem>
          </ActivityPanel>
        </Layout>
      </Phone>
    </Wrapper>
  );
}
