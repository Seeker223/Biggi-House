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
  gap: 10px;
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
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${({ theme }) => theme.colors.soft};
  padding: 6px 10px;
  border-radius: 999px;
`;

const MetaIcon = styled.span`
  display: grid;
  place-items: center;

  svg {
    width: 14px;
    height: 14px;
    stroke: ${({ theme }) => theme.colors.primary};
  }
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
  opacity: ${({ disabled }) => (disabled ? 0.65 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

export default function HouseCard({ house, onJoin, isSelected }) {
  const isFull = Boolean(house.maxUsers && house.members >= house.maxUsers);
  const isDisabled = isFull || isSelected;

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
        <MetaItem>
          <MetaIcon aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M4 7h16M4 17h16M7 4v16"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </MetaIcon>
          <span>
            Min: {"\u20A6"}
            {house.minimum}
          </span>
        </MetaItem>

        <MetaItem>
          <MetaIcon aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M16 11a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm4 9c0-3.3-3.6-6-8-6s-8 2.7-8 6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </MetaIcon>
          <span>
            Members: {house.members}
            {house.maxUsers ? `/${house.maxUsers}` : ""}
          </span>
        </MetaItem>
      </Meta>

      <Pool>
        {"\u20A6"}
        {Number(house.totalPool || 0).toLocaleString()} pool
      </Pool>

      <Button disabled={isDisabled} onClick={() => onJoin?.(house)}>
        {isSelected ? "Already joined" : isFull ? "House Full" : "Join House"}
      </Button>
    </Card>
  );
}
