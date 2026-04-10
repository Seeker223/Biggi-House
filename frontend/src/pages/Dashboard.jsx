import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import {
  clearStoredHouses,
  clearStoredUser,
  getStoredHouses,
  getStoredUser,
} from "../utils/auth";

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
  background: ${({ theme }) => theme.colors.primary};
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
  const user = getStoredUser();
  const houses = getStoredHouses();

  const handleLogout = () => {
    clearStoredUser();
    clearStoredHouses();
    navigate("/login");
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
          <Button>Add funds</Button>
          {house && <WarningButton onClick={handleLeaveHouse}>Leave house</WarningButton>}
          <GhostButton onClick={handleLogout}>Logout</GhostButton>
        </div>
      </Header>

      <Grid>
        <Card>
          <CardLabel>Wallet balance</CardLabel>
          <CardValue>₦15,000</CardValue>
        </Card>
        <Card>
          <CardLabel>Current house</CardLabel>
          <CardValue>
            {houses.length ? `House ${houses[0].number}` : "Not joined"}
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
          <CardValue>6 of 10 months</CardValue>
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
            {[
              { label: "Contribution", value: "₦300", date: "Apr 5" },
              { label: "Contribution", value: "₦300", date: "Mar 5" },
              { label: "Contribution", value: "₦300", date: "Feb 5" },
            ].map((item) => (
              <ActivityItem key={item.date}>
                <span>{item.label}</span>
                <span>
                  {item.value} · {item.date}
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
                  House {house.number} · ₦{house.minimum}
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
