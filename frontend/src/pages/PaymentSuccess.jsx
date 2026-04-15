import styled from "styled-components";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { WalletIcon, PayoutIcon } from "../components/Icons";
import { getStoredHouses, getStoredTransactions } from "../utils/auth";
import { useAuth } from "../utils/AuthContext";

const Wrapper = styled(Container)`
  padding: 70px 0;
  display: grid;
  place-items: center;
`;

const Card = styled.div`
  width: min(520px, 100%);
  background: #fff;
  border-radius: 22px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  padding: 28px;
  display: grid;
  gap: 16px;
  text-align: center;
`;

const IconRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const Title = styled.h1`
  font-size: 26px;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.muted};
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
`;

const History = styled.ul`
  list-style: none;
  display: grid;
  gap: 8px;
  text-align: left;
  margin-top: 6px;
`;

const HistoryItem = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.soft};
`;

const PrimaryButton = styled(Link)`
  padding: 12px 18px;
  border-radius: 999px;
  background: ${({ theme }) => theme.gradients.brand};
  color: #fff;
  font-weight: 600;
`;

const GhostButton = styled(Link)`
  padding: 12px 18px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-weight: 600;
`;

export default function PaymentSuccess() {
  const { user } = useAuth();
  const userId = user?.id || user?._id || user?.userId;
  const houses = getStoredHouses(userId);
  const transactions = getStoredTransactions(userId);
  const latestHouse = houses[houses.length - 1];
  const latestJoin = transactions.find((item) => item.type === "house-join");

  return (
    <Wrapper>
      <Card>
        <IconRow>
          <WalletIcon size={40} />
          <PayoutIcon size={40} />
        </IconRow>
        <Title>Payment confirmed</Title>
        <Text>
          Your contribution has been verified and your house membership is now
          active.
        </Text>
        <History>
          <HistoryItem>
            <span>Contribution</span>
            <strong>
              {"\u20A6"}
              {Number(latestJoin?.amount ?? latestHouse?.minimum ?? 0).toLocaleString()}
            </strong>
          </HistoryItem>
          <HistoryItem>
            <span>House</span>
            <strong>
              {latestHouse ? `House ${latestHouse.number}` : "Not selected"}
            </strong>
          </HistoryItem>
          <HistoryItem>
            <span>Wallet balance</span>
            <strong>
              {"\u20A6"}
              {Number(latestJoin?.currentBalance ?? 0).toLocaleString()}
            </strong>
          </HistoryItem>
          <HistoryItem>
            <span>Status</span>
            <strong>Paid</strong>
          </HistoryItem>
        </History>
        <Actions>
          <PrimaryButton to="/dashboard">Go to dashboard</PrimaryButton>
          <GhostButton to="/houses">Explore houses</GhostButton>
        </Actions>
      </Card>
    </Wrapper>
  );
}
