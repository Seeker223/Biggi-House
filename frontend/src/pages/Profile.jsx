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

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  margin-top: 24px;

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
  text-align: right;
`;

const HighlightStat = styled.div`
  margin-top: 18px;
  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.gradients.brandSoft};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
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
  gap: 12px;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.soft};
`;

const DetailList = styled.div`
  display: grid;
  gap: 12px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const DetailValue = styled.span`
  color: ${({ theme }) => theme.colors.ink};
  font-weight: 600;
  text-align: right;
`;

export default function Profile() {
  const { user } = useAuth();
  const userId = user?.id || user?._id || user?.userId;
  const houses = getStoredHouses(userId);
  const displayName = user?.name || user?.username || "Member";
  const initials =
    displayName
      ?.split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2) || "BH";

  const registrationNumber =
    user?.referralCode || `BH-${String(user?.id || "").slice(-6).toUpperCase()}`;

  const formatDate = (value) => {
    if (!value) return "Not provided";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const primaryDetails = [
    ["Registration number", registrationNumber || "Pending"],
    ["Username", user?.username || "Not provided"],
    ["Email address", user?.email || "Not provided"],
    ["Phone number", user?.phoneNumber || "Not provided"],
    ["State", user?.state || "Not provided"],
    ["Date of birth", formatDate(user?.birthDate)],
  ];

  const identityDetails = [
    ["NIN", user?.nin || "Not provided"],
    ["BVN", user?.bvn || "Not provided"],
    ["Referral code", user?.referralCode || "Not provided"],
    ["Referred by", user?.referredByCode || "Not provided"],
    ["User role", user?.userRole || user?.role || "User"],
    ["Verification", user?.isVerified ? "Verified" : "Pending"],
  ];

  return (
    <Wrapper>
      <Header>
        <div>
          <Title>Profile</Title>
          <Sub>Manage your account and view your participation details.</Sub>
        </div>
        <Badge>{user?.isVerified ? "Verified member" : "Pending verification"}</Badge>
      </Header>

      <Grid>
        <Card>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <Avatar>{initials.toUpperCase()}</Avatar>
            <div>
              <h3 style={{ marginBottom: "4px" }}>{displayName}</h3>
              <Sub>{user?.email || "member@biggihouse.com"}</Sub>
            </div>
          </div>
          <InfoList>
            <InfoRow>
              <span>Membership status</span>
              <InfoValue>{user?.isVerified ? "Active" : "Pending"}</InfoValue>
            </InfoRow>
            <InfoRow>
              <span>Joined houses</span>
              <InfoValue>{houses.length}</InfoValue>
            </InfoRow>
            <InfoRow>
              <span>Registration number</span>
              <InfoValue>{registrationNumber || "Pending"}</InfoValue>
            </InfoRow>
          </InfoList>
          <HighlightStat>
            <span>Total houses joined</span>
            <span>{houses.length}</span>
          </HighlightStat>
        </Card>

        <Card>
          <SectionTitle>Recent activity</SectionTitle>
          <Activity>
            {[
              { label: "Contribution received", value: "\u20A615,000", date: "Apr 5" },
              { label: "House joined", value: "House 3", date: "Mar 18" },
              { label: "Payout scheduled", value: "Jun 30", date: "Mar 10" },
            ].map((item) => (
              <ActivityItem key={item.date}>
                <span>
                  {item.label} {"\u00B7"} {item.date}
                </span>
                <strong>{item.value}</strong>
              </ActivityItem>
            ))}
          </Activity>
        </Card>
      </Grid>

      <DetailsGrid>
        <Card>
          <SectionTitle>Registration Details</SectionTitle>
          <DetailList>
            {primaryDetails.map(([label, value]) => (
              <DetailRow key={label}>
                <span>{label}</span>
                <DetailValue>{value}</DetailValue>
              </DetailRow>
            ))}
          </DetailList>
        </Card>

        <Card>
          <SectionTitle>Identity And Access</SectionTitle>
          <DetailList>
            {identityDetails.map(([label, value]) => (
              <DetailRow key={label}>
                <span>{label}</span>
                <DetailValue>{value}</DetailValue>
              </DetailRow>
            ))}
          </DetailList>
        </Card>
      </DetailsGrid>
    </Wrapper>
  );
}
