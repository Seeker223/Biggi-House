import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import HouseCard from "../components/HouseCard";
import { houses } from "../data/houses";
import { addStoredHouse, getAuthToken, getStoredHouses } from "../utils/auth";
import { useAuth } from "../utils/AuthContext";
import { getHouses, joinHouse } from "../services/api";

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

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const Select = styled.select`
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
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

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(8, 12, 24, 0.35);
  display: grid;
  place-items: center;
  z-index: 50;
  padding: 20px;
`;

const ModalCard = styled.div`
  width: min(520px, 100%);
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  display: grid;
  gap: 14px;
`;

const ModalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
`;

const GhostButton = styled.button`
  padding: 10px 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  font-weight: 600;
`;

const PrimaryButton = styled.button`
  padding: 10px 16px;
  border-radius: 12px;
  border: none;
  background: ${({ theme }) => theme.gradients.brand};
  color: #fff;
  font-weight: 600;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

export default function Houses() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [range, setRange] = useState("all");
  const [sort, setSort] = useState("amount-asc");
  const [list, setList] = useState(houses);
  const [loadingList, setLoadingList] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const filtered = useMemo(() => {
    let result = [...list];
    if (range !== "all") {
      const [min, max] = range.split("-").map(Number);
      result = result.filter((house) => house.minimum >= min && house.minimum <= max);
    }
    if (sort === "amount-asc") {
      result.sort((a, b) => a.minimum - b.minimum);
    }
    if (sort === "amount-desc") {
      result.sort((a, b) => b.minimum - a.minimum);
    }
    if (sort === "availability") {
      result.sort(
        (a, b) =>
          a.members / a.maxUsers - b.members / b.maxUsers
      );
    }
    return result;
  }, [list, range, sort]);

  useEffect(() => {
    setLoadingList(true);
    getHouses()
      .then((data) => {
        if (data.length) setList(data);
      })
      .catch(() => {
        setError("Using local data (API unavailable).");
      })
      .finally(() => setLoadingList(false));
  }, []);

  const currentHouses = getStoredHouses();

  const handleJoin = (house) => {
    if (!user) {
      navigate("/login");
      return;
    }
    setSelected(house);
    setSuccess("");
  };

  const confirmJoin = () => {
    if (!selected) return;
    setLoading(true);
    const token = getAuthToken();
    joinHouse(selected.id, token)
      .then((updated) => {
        setList((prev) =>
          prev.map((house) => (house.id === updated.id ? updated : house))
        );
        addStoredHouse({
          id: updated.id,
          number: updated.number,
          minimum: updated.minimum,
        });
        setSelected(null);
        navigate("/payment-success");
      })
      .catch(() => {
        setError("Unable to join house right now.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Container>
        <PageHeader>
          <Title>Choose your house</Title>
          <Sub>
            Select a weekly minimum and join a cycle that fits your budget.
          </Sub>
          <Controls>
            <Filters>
              <Chip $active={range === "all"} onClick={() => setRange("all")}>
                All houses
              </Chip>
              <Chip
                $active={range === "100-300"}
                onClick={() => setRange("100-300")}
              >
                ₦100 - ₦300
              </Chip>
              <Chip
                $active={range === "400-700"}
                onClick={() => setRange("400-700")}
              >
                ₦400 - ₦700
              </Chip>
              <Chip
                $active={range === "800-1000"}
                onClick={() => setRange("800-1000")}
              >
                ₦800 - ₦1000
              </Chip>
            </Filters>
            <Select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="amount-asc">Sort: Amount (low → high)</option>
              <option value="amount-desc">Sort: Amount (high → low)</option>
              <option value="availability">Sort: Availability</option>
            </Select>
          </Controls>
          {loadingList && (
            <p style={{ marginTop: "10px", color: "#5b6475" }}>
              Loading houses...
            </p>
          )}
          {error && (
            <p style={{ marginTop: "10px", color: "#b45309" }}>{error}</p>
          )}
        </PageHeader>
      </Container>
      <Grid>
        {filtered.map((house) => (
          <HouseCard
            key={house.id}
            house={house}
            onJoin={handleJoin}
            isSelected={currentHouses.some((item) => item.id === house.id)}
          />
        ))}
      </Grid>

      {selected && (
        <ModalBackdrop>
          <ModalCard>
            <h2>Confirm your selection</h2>
            <p style={{ color: "#5b6475" }}>
              You are about to join House {selected.number}. This house requires
              a minimum weekly contribution of ₦{selected.minimum}.
            </p>
            <ModalRow>
              <span>Current members</span>
              <strong>
                {selected.members}
                {selected.maxUsers ? `/${selected.maxUsers}` : ""}
              </strong>
            </ModalRow>
            <ModalRow>
              <span>Estimated pool</span>
              <strong>₦{selected.totalPool.toLocaleString()}</strong>
            </ModalRow>
            <ModalActions>
              <GhostButton onClick={() => setSelected(null)}>
                Cancel
              </GhostButton>
              <PrimaryButton onClick={confirmJoin} disabled={loading}>
                {loading ? "Processing..." : "Join house"}
              </PrimaryButton>
            </ModalActions>
          </ModalCard>
        </ModalBackdrop>
      )}
    </>
  );
}
