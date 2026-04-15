import styled from "styled-components";
import { useEffect, useState } from "react";
import Container from "../components/Container";
import WalletCard from "../components/WalletCard";
import { useAuth } from "../utils/AuthContext";
import { getAuthToken } from "../utils/auth";
import {
  depositBiggiHouseWallet,
  getBiggiHouseWallet,
  withdrawBiggiHouseWallet,
} from "../services/api";

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
  const [wallet, setWallet] = useState(null);
  const [loadingWallet, setLoadingWallet] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getAuthToken();
    if (!token) return;

    setLoadingWallet(true);
    getBiggiHouseWallet(token)
      .then((data) => setWallet(data))
      .catch((err) => setError(err?.message || "Unable to load wallet."))
      .finally(() => setLoadingWallet(false));
  }, []);

  const walletBalance = Number(wallet?.balance || 0);
  const latestJoin = (wallet?.transactions || []).find((item) => item.type === "house_join");
  const recentTransactions = (wallet?.transactions || []).slice(0, 4).map((item) => ({
    id: item._id || item.reference || String(item.date || Date.now()),
    label:
      item.type === "deposit"
        ? "Deposit"
        : item.type === "withdraw"
        ? "Withdraw"
        : "House Contribution",
    note:
      item.type === "house_join"
        ? `House ${item?.meta?.houseNumber || ""}`.trim()
        : item.type === "deposit"
        ? "Wallet top-up"
        : "Wallet withdrawal",
    amount: Number(item.amount || 0),
    variant: item.type === "deposit" ? "green" : "blue",
  }));

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
              currentHouse={latestJoin?.meta?.houseNumber ? `House ${latestJoin.meta.houseNumber}` : "Not joined"}
              lastBalance={latestJoin?.meta?.previousBalance ?? walletBalance}
            />
            <Actions>
              <PrimaryButton
                onClick={() => {
                  const input = window.prompt("Enter deposit amount (NGN):", "1000");
                  const amount = Number(input || 0);
                  if (!Number.isFinite(amount) || amount <= 0) return;
                  setError("");
                  const token = getAuthToken();
                  if (!token) return;
                  depositBiggiHouseWallet(amount, token)
                    .then(() => getBiggiHouseWallet(token).then((data) => setWallet(data)))
                    .catch((err) => setError(err?.message || "Deposit failed."));
                }}
              >
                Deposit
              </PrimaryButton>
              <GhostButton
                onClick={() => {
                  const input = window.prompt("Enter withdraw amount (NGN):", "1000");
                  const amount = Number(input || 0);
                  if (!Number.isFinite(amount) || amount <= 0) return;
                  setError("");
                  const token = getAuthToken();
                  if (!token) return;
                  withdrawBiggiHouseWallet(amount, token)
                    .then(() => getBiggiHouseWallet(token).then((data) => setWallet(data)))
                    .catch((err) => setError(err?.message || "Withdraw failed."));
                }}
              >
                Withdraw
              </GhostButton>
            </Actions>
            {loadingWallet && (
              <p style={{ marginTop: "8px", color: "#5b6475" }}>Loading wallet...</p>
            )}
            {error && <p style={{ marginTop: "8px", color: "#c02626" }}>{error}</p>}
          </div>
          <ActivityPanel>
            <ActivityTitle>Recent Activity</ActivityTitle>
            {recentTransactions.length > 0 ? (
              recentTransactions.map((item) => (
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
              ))
            ) : (
              <p style={{ color: "#5b6475" }}>No transactions yet.</p>
            )}
          </ActivityPanel>
        </Layout>
      </Phone>
    </Wrapper>
  );
}
