import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import WalletCard from "../components/WalletCard";
import {
  clearStoredHouses,
  getStoredHouses,
  getStoredTransactions,
  getUserWalletBalance,
} from "../utils/auth";
import { useAuth } from "../utils/AuthContext";

const Wrapper = styled(Container)`
  padding: 40px 0 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  font-size: 32px;
`;

const Button = styled.button`
  padding: 10px 18px;
  border-radius: 999px;
  border: none;
  background: ${({ theme }) => theme.gradients.brand};
  color: #fff;
  font-weight: 600;
`;

const SecondaryButton = styled.button`
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  font-weight: 600;
`;

const GhostButton = styled.button`
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  font-weight: 600;
`;

const WarningButton = styled.button`
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid rgba(239, 68, 68, 0.4);
  background: rgba(239, 68, 68, 0.1);
  color: #b91c1c;
  font-weight: 600;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-top: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 22px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const CardLabel = styled.div`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
`;

const CardValue = styled.div`
  font-size: 26px;
  font-weight: 700;
  margin-top: 6px;
`;

const ProgressWrap = styled.div`
  margin-top: 10px;
  height: 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.soft};
  overflow: hidden;
`;

const Progress = styled.div`
  width: 60%;
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
`;

const Activity = styled.ul`
  list-style: none;
  margin-top: 16px;
  display: grid;
  gap: 12px;
`;

const ActivityItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 12px 14px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
`;

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const houses = getStoredHouses();
  const transactions = getStoredTransactions();
  const walletBalance = getUserWalletBalance(user);
  const latestHouse = houses[houses.length - 1];
  const latestJoin = transactions.find((item) => item.type === "house-join");
  const recentActivity =
    transactions.length > 0
      ? transactions.slice(0, 3).map((item) => ({
          label: item.label,
          value: new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0,
          }).format(Number(item.amount || 0)),
          date: new Date(item.createdAt || Date.now()).toLocaleDateString("en-NG", {
            day: "numeric",
            month: "short",
          }),
        }))
      : [
          { label: "Contribution", value: "\u20A6300", date: "Apr 5" },
          { label: "Contribution", value: "\u20A6300", date: "Mar 5" },
          { label: "Contribution", value: "\u20A6300", date: "Feb 5" },
        ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLeaveHouse = () => {
    clearStoredHouses();
    navigate("/houses");
  };

  return (
    <Wrapper>
      <Header>
        <div>
          <Title>Dashboard</Title>
          <p style={{ color: "#5b6475" }}>
            Welcome back, {user?.name || "Member"}. Track your savings cycle in
            one glance.
          </p>
          {user?.email && (
            <p style={{ color: "#5b6475", marginTop: "4px" }}>
              {user.email}
            </p>
          )}
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {houses.length > 0 && (
            <WarningButton onClick={handleLeaveHouse}>Leave house</WarningButton>
          )}
          <GhostButton onClick={handleLogout}>Logout</GhostButton>
        </div>
      </Header>

      <Grid>
        <WalletCard
          balance={walletBalance}
          currentHouse={latestHouse ? `House ${latestHouse.number}` : "Not joined"}
          lastBalance={latestJoin?.previousBalance ?? walletBalance}
        />
        <Card>
          <CardLabel>Current house</CardLabel>
          <CardValue>
            {latestHouse ? `House ${latestHouse.number}` : "Not joined"}
          </CardValue>
        </Card>
        <Card>
          <CardLabel>Next payout</CardLabel>
          <CardValue>June 30, 2026</CardValue>
        </Card>
      </Grid>

      <Grid style={{ marginTop: "24px" }}>
        <Card>
          <CardLabel>Cycle progress</CardLabel>
          <CardValue>6 of 10 weeks</CardValue>
          <ProgressWrap>
            <Progress />
          </ProgressWrap>
          <p style={{ color: "#5b6475", marginTop: "10px" }}>
            Payout position: 4 of 10
          </p>
        </Card>
        <Card>
          <CardLabel>Contribution status</CardLabel>
          <CardValue>Paid for April</CardValue>
          <p style={{ color: "#5b6475", marginTop: "10px" }}>
            Next contribution due: May 5, 2026
          </p>
        </Card>
        <Card>
          <CardLabel>Recent activity</CardLabel>
          <Activity>
            {recentActivity.map((item) => (
              <ActivityItem key={item.date}>
                <span>{item.label}</span>
                <span>
                  {item.value} {"\u00B7"} {item.date}
                </span>
              </ActivityItem>
            ))}
          </Activity>
        </Card>
      </Grid>

      <Grid style={{ marginTop: "24px" }}>
        <Card>
          <CardLabel>Joined houses</CardLabel>
          {houses.length ? (
            <ul style={{ marginTop: "12px", display: "grid", gap: "8px" }}>
              {houses.map((house) => (
                <li key={house.id}>
                  House {house.number} {"\u00B7"} {"\u20A6"}
                  {house.minimum}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: "#5b6475", marginTop: "10px" }}>
              You have not joined a house yet.
            </p>
          )}
        </Card>
      </Grid>
    </Wrapper>
  );
}
