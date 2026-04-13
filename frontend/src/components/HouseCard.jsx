import styled from "styled-components";
import { HouseIcon } from "./Icons";

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

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconWrap = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.soft};
  display: grid;
  place-items: center;
`;

const Badge = styled.span`
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  background: ${({ theme, $variant }) => {
    if ($variant === "Full") return "rgba(239, 68, 68, 0.12)";
    if ($variant === "Open") return "rgba(27, 77, 182, 0.12)";
    return "rgba(245, 158, 11, 0.18)";
  }};
  color: ${({ theme, $variant }) => {
    if ($variant === "Full") return "#ef4444";
    if ($variant === "Open") return theme.colors.primary;
    return theme.colors.accent;
  }};
  font-weight: 600;
`;

const JoinBadge = styled.span`
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  background: rgba(22, 163, 74, 0.12);
  color: #16a34a;
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
  background: ${({ theme }) => theme.gradients.brand};
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.65 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

export default function HouseCard({ house, onJoin, isSelected }) {
  const isFull = Boolean(house.maxUsers && house.members >= house.maxUsers);
  return (
    <Card>
      <TopRow>
        <TitleRow>
          <IconWrap>
            <HouseIcon size={26} />
          </IconWrap>
          <Title>House {house.number}</Title>
        </TitleRow>
        {isSelected ? (
          <JoinBadge>Joined</JoinBadge>
        ) : (
          <Badge $variant={house.status}>{house.status}</Badge>
        )}
      </TopRow>
      <Meta>
        <span>Minimum: ₦{house.minimum}</span>
        <span>
          Members: {house.members}
          {house.maxUsers ? `/${house.maxUsers}` : ""}
        </span>
      </Meta>
      <Pool>₦{house.totalPool.toLocaleString()} pool</Pool>
      <Button disabled={isFull} onClick={() => onJoin?.(house)}>
        {isFull ? "House Full" : "Join House"}
      </Button>
    </Card>
  );
}
