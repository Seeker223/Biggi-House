import styled from "styled-components";
import Container from "../components/Container";
import { getStoredHouses } from "../utils/auth";
import { useAuth } from "../utils/AuthContext";

const Wrapper = styled(Container)`
  padding: 40px 0 60px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 32px;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 340px) minmax(0, 1fr);
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Avatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 22px;
  background: ${({ theme }) => theme.gradients.brand};
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 24px;
`;

const Sub = styled.p`
  color: ${({ theme }) => theme.colors.muted};
`;

const Badge = styled.span`
  padding: 6px 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.soft};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 12px;
  font-weight: 600;
`;

const InfoList = styled.div`
  display: grid;
  gap: 12px;
  margin-top: 16px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
`;

const InfoValue = styled.span`
  color: ${({ theme }) => theme.colors.ink};
  font-weight: 600;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 12px;
`;

const Activity = styled.ul`
  list-style: none;
  display: grid;
  gap: 12px;
`;

const ActivityItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.soft};
`;

export default function Profile() {
  const { user } = useAuth();
  const houses = getStoredHouses();
  const initials =
    user?.name
      ?.split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2) || "BH";

  return (
    <Wrapper>
      <Header>
        <div>
          <Title>Profile</Title>
          <Sub>Manage your account and view your participation details.</Sub>
        </div>
        <Badge>Verified member</Badge>
      </Header>

      <Grid>
        <Card>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <Avatar>{initials.toUpperCase()}</Avatar>
            <div>
              <h3 style={{ marginBottom: "4px" }}>{user?.name || "Member"}</h3>
              <Sub>{user?.email || "member@biggihouse.com"}</Sub>
            </div>
          </div>
          <InfoList>
            <InfoRow>
              <span>Membership status</span>
              <InfoValue>Active</InfoValue>
            </InfoRow>
            <InfoRow>
              <span>Joined houses</span>
              <InfoValue>{houses.length}</InfoValue>
            </InfoRow>
            <InfoRow>
              <span>Wallet status</span>
              <InfoValue>Healthy</InfoValue>
            </InfoRow>
          </InfoList>
        </Card>

        <Card>
          <SectionTitle>Recent activity</SectionTitle>
          <Activity>
            {[
              { label: "Contribution received", value: "₦15,000", date: "Apr 5" },
              { label: "House joined", value: "House 3", date: "Mar 18" },
              { label: "Payout scheduled", value: "Jun 30", date: "Mar 10" },
            ].map((item) => (
              <ActivityItem key={item.date}>
                <span>
                  {item.label} · {item.date}
                </span>
                <strong>{item.value}</strong>
              </ActivityItem>
            ))}
          </Activity>
        </Card>
      </Grid>
    </Wrapper>
  );
}
