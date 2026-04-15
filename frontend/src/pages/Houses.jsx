import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import HouseCard from "../components/HouseCard";
import { houses } from "../data/houses";
import {
  addStoredHouse,
  addStoredTransaction,
  getAuthToken,
  getStoredHouses,
  getUserWalletBalance,
  updateUserWalletBalance,
} from "../utils/auth";
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
  const { user, updateUser } = useAuth();
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
      result = result.filter(
        (house) => house.minimum >= min && house.minimum <= max
      );
    }
    if (sort === "amount-asc") {
      result.sort((a, b) => a.minimum - b.minimum);
    }
    if (sort === "amount-desc") {
      result.sort((a, b) => b.minimum - a.minimum);
    }
    if (sort === "availability") {
      result.sort((a, b) => Number(a.members || 0) - Number(b.members || 0));
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
        setError("Using local house data while the live house service is unavailable.");
      })
      .finally(() => setLoadingList(false));
  }, []);

  const currentHouses = getStoredHouses();
  const walletBalance = getUserWalletBalance(user);

  const handleJoin = (house) => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (currentHouses.some((item) => item.id === house.id)) {
      setError(`You have already joined House ${house.number}.`);
      return;
    }
    setError("");
    setSuccess("");
    setSelected(house);
  };

  const applyLocalJoin = (house, options = {}) => {
    const { useRemoteState = false } = options;
    const previousBalance = getUserWalletBalance(user);
    const contribution = Number(house.minimum || 0);
    const nextBalance = previousBalance - contribution;

    setList((prev) =>
      prev.map((item) =>
        item.id === house.id
          ? {
              ...item,
              ...house,
              members: useRemoteState
                ? Number(house.members ?? item.members ?? 0)
                : Number(item.members || 0) + 1,
              totalPool: useRemoteState
                ? Number(house.totalPool ?? item.totalPool ?? 0)
                : Number(item.totalPool || 0) + contribution,
              status: "In Progress",
            }
          : item
      )
    );

    addStoredHouse({
      id: house.id,
      number: house.number,
      minimum: contribution,
    });

    addStoredTransaction({
      id: `house-join-${house.id}-${Date.now()}`,
      type: "house-join",
      label: `House ${house.number} contribution`,
      note: "Weekly contribution paid",
      amount: contribution,
      previousBalance,
      currentBalance: nextBalance,
      variant: "blue",
      createdAt: new Date().toISOString(),
    });

    updateUser((current) => updateUserWalletBalance(current, nextBalance));

    setSuccess(`You joined House ${house.number} successfully.`);
    setSelected(null);
    navigate("/payment-success");
  };

  const confirmJoin = () => {
    if (!selected) return;
    if (walletBalance < Number(selected.minimum || 0)) {
      setError("Insufficient wallet balance to pay into this house.");
      return;
    }

    setLoading(true);
    const token = getAuthToken();

    joinHouse(selected.id, token)
      .then((updated) => {
        applyLocalJoin({ ...selected, ...updated }, { useRemoteState: true });
      })
      .catch(() => {
        applyLocalJoin(selected);
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
                {"\u20A6"}100 - {"\u20A6"}300
              </Chip>
              <Chip
                $active={range === "400-700"}
                onClick={() => setRange("400-700")}
              >
                {"\u20A6"}400 - {"\u20A6"}700
              </Chip>
              <Chip
                $active={range === "800-1000"}
                onClick={() => setRange("800-1000")}
              >
                {"\u20A6"}800 - {"\u20A6"}1000
              </Chip>
            </Filters>
            <Select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="amount-asc">Sort: Amount (low to high)</option>
              <option value="amount-desc">Sort: Amount (high to low)</option>
              <option value="availability">Sort: Availability</option>
            </Select>
          </Controls>
          {loadingList && (
            <p style={{ marginTop: "10px", color: "#5b6475" }}>
              Loading houses...
            </p>
          )}
          {success && (
            <p style={{ marginTop: "10px", color: "#15803d" }}>{success}</p>
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
              a minimum weekly contribution of {"\u20A6"}
              {selected.minimum}.
            </p>
            <ModalRow>
              <span>Wallet balance</span>
              <strong>
                {"\u20A6"}
                {walletBalance.toLocaleString()}
              </strong>
            </ModalRow>
            <ModalRow>
              <span>Contribution amount</span>
              <strong>
                {"\u20A6"}
                {Number(selected.minimum || 0).toLocaleString()}
              </strong>
            </ModalRow>
            <ModalRow>
              <span>Balance after payment</span>
              <strong>
                {"\u20A6"}
                {Math.max(0, walletBalance - Number(selected.minimum || 0)).toLocaleString()}
              </strong>
            </ModalRow>
            <ModalRow>
              <span>Current members</span>
              <strong>{selected.members}</strong>
            </ModalRow>
            <ModalRow>
              <span>Estimated pool</span>
              <strong>
                {"\u20A6"}
                {Number(selected.totalPool || 0).toLocaleString()}
              </strong>
            </ModalRow>
            <ModalActions>
              <GhostButton onClick={() => setSelected(null)}>
                Cancel
              </GhostButton>
              <PrimaryButton onClick={confirmJoin} disabled={loading}>
                {loading ? "Processing..." : "Pay and join house"}
              </PrimaryButton>
            </ModalActions>
          </ModalCard>
        </ModalBackdrop>
      )}
    </>
  );
}
