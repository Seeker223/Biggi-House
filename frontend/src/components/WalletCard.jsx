import styled from "styled-components";

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const CardTop = styled.div`
  background: ${({ theme }) => theme.gradients.brand};
  color: #fff;
  padding: 20px 22px;
`;

const CardLabel = styled.div`
  font-size: 13px;
  opacity: 0.85;
`;

const BalanceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-top: 8px;
`;

const Currency = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const Amount = styled.span`
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

const Body = styled.div`
  padding: 16px 22px 18px;
  display: grid;
  gap: 12px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
`;

const RowValue = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink};
`;

export default function WalletCard() {
  return (
    <Card>
      <CardTop>
        <CardLabel>Street Name</CardLabel>
        <BalanceRow>
          <Currency>{"\u20A6"}</Currency>
          <Amount>15,000</Amount>
        </BalanceRow>
      </CardTop>
      <Body>
        <Row>
          <span>Virtual Transaction</span>
          <RowValue>{"\u2699\uFE0F"}</RowValue>
        </Row>
        <Divider />
        <Row>
          <span>SME Data Payment</span>
          <RowValue>{"\u20A6"}37,000</RowValue>
        </Row>
        <Divider />
        <Row>
          <span>Expiry position</span>
          <RowValue>May 30</RowValue>
        </Row>
      </Body>
    </Card>
  );
}
