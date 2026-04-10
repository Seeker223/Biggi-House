import styled from "styled-components";
import Container from "../components/Container";
import HouseCard from "../components/HouseCard";
import { houses } from "../data/houses";

const PageHeader = styled.div`
  padding: 40px 0 12px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 8px;
`;

const Sub = styled.p`
  color: ${({ theme }) => theme.colors.muted};
`;

const Filters = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const Chip = styled.button`
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : "transparent"};
  color: ${({ $active }) => ($active ? "#fff" : "inherit")};
  font-weight: 600;
  cursor: pointer;
`;

const Grid = styled(Container)`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  padding-top: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export default function Houses() {
  return (
    <>
      <Container>
        <PageHeader>
          <Title>Choose your house</Title>
          <Sub>
            Select a monthly minimum and join a cycle that fits your budget.
          </Sub>
          <Filters>
            <Chip $active>All houses</Chip>
            <Chip>₦100 - ₦300</Chip>
            <Chip>₦400 - ₦700</Chip>
            <Chip>₦800 - ₦1000</Chip>
          </Filters>
        </PageHeader>
      </Container>
      <Grid>
        {houses.map((house) => (
          <HouseCard key={house.id} house={house} />
        ))}
      </Grid>
    </>
  );
}
