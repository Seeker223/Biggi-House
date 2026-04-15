import styled from "styled-components";
import Container from "../components/Container";
import WalletCard from "../components/WalletCard";
import { useAuth } from "../utils/AuthContext";
import {
  getStoredHouses,
  getStoredTransactions,
  addStoredTransaction,
  getBiggiHouseWalletBalance,
  setBiggiHouseWalletBalance,
} from "../utils/auth";

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
  gap: 12px;
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

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export default function Wallet() {
  const { user } = useAuth();
  const userId = user?.id || user?._id || user?.userId;
  const houses = getStoredHouses(userId);
  const transactions = getStoredTransactions(userId);
  const walletBalance = getBiggiHouseWalletBalance(userId);
  const latestHouse = houses[houses.length - 1];
  const currentHouse = latestHouse ? `House ${latestHouse.number}` : "Not joined";
  const latestJoin = transactions.find((item) => item.type === "house-join");
  const recentTransactions =
    transactions.length > 0
      ? transactions.slice(0, 4)
      : [
          {
            id: "reward",
            label: "Quick Receive",
            note: "Investment",
            amount: user?.rewardBalance ?? 0,
            variant: "green",
          },
          {
            id: "wallet",
            label: "Course House",
            note: currentHouse,
            amount: walletBalance,
            variant: "blue",
          },
        ];

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
            <WalletCard
              balance={walletBalance}
              currentHouse={currentHouse}
              lastBalance={latestJoin?.previousBalance ?? walletBalance}
            />
            <Actions>
              <PrimaryButton
                onClick={() => {
                  const input = window.prompt("Enter deposit amount (NGN):", "1000");
                  const amount = Number(input || 0);
                  if (!Number.isFinite(amount) || amount <= 0) return;
                  const previousBalance = getBiggiHouseWalletBalance(userId);
                  const nextBalance = setBiggiHouseWalletBalance(
                    userId,
                    previousBalance + amount
                  );
                  addStoredTransaction(
                    {
                      id: `deposit-${Date.now()}`,
                      type: "deposit",
                      label: "Deposit",
                      note: "Wallet top-up",
                      amount,
                      previousBalance,
                      currentBalance: nextBalance,
                      variant: "green",
                      createdAt: new Date().toISOString(),
                    },
                    userId
                  );
                }}
              >
                Deposit
              </PrimaryButton>
              <GhostButton
                onClick={() => {
                  const input = window.prompt("Enter withdraw amount (NGN):", "1000");
                  const amount = Number(input || 0);
                  if (!Number.isFinite(amount) || amount <= 0) return;
                  const previousBalance = getBiggiHouseWalletBalance(userId);
                  if (amount > previousBalance) return;
                  const nextBalance = setBiggiHouseWalletBalance(
                    userId,
                    previousBalance - amount
                  );
                  addStoredTransaction(
                    {
                      id: `withdraw-${Date.now()}`,
                      type: "withdraw",
                      label: "Withdraw",
                      note: "Wallet withdrawal",
                      amount,
                      previousBalance,
                      currentBalance: nextBalance,
                      variant: "blue",
                      createdAt: new Date().toISOString(),
                    },
                    userId
                  );
                }}
              >
                Withdraw
              </GhostButton>
            </Actions>
          </div>
          <ActivityPanel>
            <ActivityTitle>Recent Activity</ActivityTitle>
            {recentTransactions.map((item) => (
              <ActivityItem key={item.id}>
                <ItemLeft>
                  <IconCircle $variant={item.variant || "blue"} aria-hidden="true">
                    {item.variant === "green" ? (
                      <svg viewBox="0 0 24 24" fill="none">
                        <path
                          d="M6 12l4 4 8-8"
                          stroke="#16a34a"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 4l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8L12 4z"
                          stroke="#2563eb"
                          strokeWidth="1.8"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </IconCircle>
                  <div>
                    <ItemTitle>{item.label}</ItemTitle>
                    <ItemSub>{item.note}</ItemSub>
                  </div>
                </ItemLeft>
                <ItemValue>{formatCurrency(item.amount)}</ItemValue>
              </ActivityItem>
            ))}
          </ActivityPanel>
        </Layout>
      </Phone>
    </Wrapper>
  );
}
