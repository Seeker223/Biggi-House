import styled from "styled-components";

const Card = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 20px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Badge = styled.span`
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  background: ${({ theme, $variant }) =>
    $variant === "Open" ? "rgba(27, 77, 182, 0.12)" : "rgba(245, 158, 11, 0.18)"};
  color: ${({ theme, $variant }) =>
    $variant === "Open" ? theme.colors.primary : theme.colors.accent};
  font-weight: 600;
`;

const Title = styled.h3`
  font-size: 20px;
`;

const Meta = styled.div`
  display: grid;
  gap: 6px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
`;

const Pool = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

const Button = styled.button`
  margin-top: auto;
  padding: 12px 16px;
  border-radius: 12px;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`;

export default function HouseCard({ house }) {
  return (
    <Card>
      <TopRow>
        <Title>House {house.number}</Title>
        <Badge $variant={house.status}>{house.status}</Badge>
      </TopRow>
      <Meta>
        <span>Minimum: ₦{house.minimum}</span>
        <span>Members: {house.members}/10</span>
      </Meta>
      <Pool>₦{house.totalPool.toLocaleString()} pool</Pool>
      <Button>Join House</Button>
    </Card>
  );
}
