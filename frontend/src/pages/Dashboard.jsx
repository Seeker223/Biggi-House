import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import WalletCard from "../components/WalletCard";
import {
  clearStoredHouses,
  getAuthToken,
} from "../utils/auth";
import { useAuth } from "../utils/AuthContext";
import {
  createBiggiHouseVendorRequest,
  getBiggiHouseEligibility,
  getBiggiHouseMemberships,
  getBiggiHouseVendors,
  getBiggiHouseWallet,
} from "../services/api";

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
  background: ${({ theme }) => theme.gradients.brand};
  color: #fff;
  font-weight: 600;
`;

const SecondaryButton = styled.button`
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
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
  const { user, logout } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [eligibility, setEligibility] = useState(null);
  const [memberships, setMemberships] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [requestVendorOpen, setRequestVendorOpen] = useState(false);
  const [requestForm, setRequestForm] = useState({
    vendorUserId: "",
    phoneNumber: user?.phoneNumber || "",
    network: "",
    planId: "",
    note: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getAuthToken();
    if (!token) return;

    setLoadingData(true);
    Promise.all([
      getBiggiHouseWallet(token).then((data) => setWallet(data)),
      getBiggiHouseVendors(token).then((data) => setVendors(data || [])),
      getBiggiHouseEligibility(token).then((data) => setEligibility(data)),
      getBiggiHouseMemberships(token).then((data) => setMemberships(data || [])),
    ])
      .catch((err) => setError(err?.message || "Unable to load dashboard data."))
      .finally(() => setLoadingData(false));
  }, []);

  const walletBalance = Number(wallet?.balance || 0);
  const latestHouse = memberships[0]?.house || null;
  const latestJoin = (wallet?.transactions || []).find((item) => item.type === "house_join");
  const recentActivity =
    transactions.length > 0
      ? transactions.slice(0, 3).map((item) => ({
          label: item.label,
          value: new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0,
          }).format(Number(item.amount || 0)),
          date: new Date(item.createdAt || Date.now()).toLocaleDateString("en-NG", {
            day: "numeric",
            month: "short",
          }),
        }))
      : [
          { label: "Contribution", value: "\u20A6300", date: "Apr 5" },
          { label: "Contribution", value: "\u20A6300", date: "Mar 5" },
          { label: "Contribution", value: "\u20A6300", date: "Feb 5" },
        ];

  const handleLogout = () => {
    logout();
    navigate("/");
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
          {houses.length > 0 && (
            <WarningButton onClick={handleLeaveHouse}>Leave house</WarningButton>
          )}
          <GhostButton onClick={handleLogout}>Logout</GhostButton>
        </div>
      </Header>

      <Grid>
        <WalletCard
          balance={walletBalance}
          currentHouse={latestHouse ? `House ${latestHouse.number}` : "Not joined"}
          lastBalance={latestJoin?.meta?.previousBalance ?? walletBalance}
        />
        <Card>
          <CardLabel>Current house</CardLabel>
          <CardValue>
            {latestHouse ? `House ${latestHouse.number}` : "Not joined"}
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
          <CardValue>6 of 10 weeks</CardValue>
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
            {(wallet?.transactions || []).slice(0, 3).map((item) => (
              <ActivityItem key={item.reference || item._id}>
                <span>
                  {item.type === "deposit"
                    ? "Deposit"
                    : item.type === "withdraw"
                    ? "Withdraw"
                    : "House contribution"}
                </span>
                <span>
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                    maximumFractionDigits: 0,
                  }).format(Number(item.amount || 0))}{" "}
                  {"\u00B7"}{" "}
                  {new Date(item.date || Date.now()).toLocaleDateString("en-NG", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </ActivityItem>
            ))}
          </Activity>
        </Card>
      </Grid>

      <Grid style={{ marginTop: "24px" }}>
        <Card>
          <CardLabel>Joined houses</CardLabel>
          {memberships.length ? (
            <ul style={{ marginTop: "12px", display: "grid", gap: "8px" }}>
              {memberships.map((membership) => (
                <li key={membership.id}>
                  House {membership.house.number} {"\u00B7"} {"\u20A6"}
                  {membership.house.minimum}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: "#5b6475", marginTop: "10px" }}>
              You have not joined a house yet.
            </p>
          )}
        </Card>
        <Card>
          <CardLabel>Buy Data To Join Houses</CardLabel>
          <div style={{ marginTop: "12px", display: "grid", gap: "10px" }}>
            <p style={{ color: "#5b6475" }}>
              Weekly requirement: buy at least 1 data bundle for your phone number.
            </p>
            <p style={{ color: "#111827", fontWeight: 700 }}>
              Status:{" "}
              {eligibility?.eligible
                ? "Eligible"
                : eligibility?.reason === "MISSING_PHONE_NUMBER"
                ? "Add phone number"
                : "Not eligible"}
            </p>
            {!eligibility?.eligible && (
              <>
                <SecondaryButton onClick={() => setRequestVendorOpen(true)}>
                  Request a vendor purchase
                </SecondaryButton>
                <p style={{ color: "#5b6475", fontSize: "14px" }}>
                  Vendors are Biggi Data merchant users who can help you buy data.
                </p>
              </>
            )}
            {loadingData && <p style={{ color: "#5b6475" }}>Loading...</p>}
            {error && <p style={{ color: "#c02626" }}>{error}</p>}
          </div>
        </Card>
      </Grid>

      {requestVendorOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(8, 12, 24, 0.35)",
            display: "grid",
            placeItems: "center",
            padding: "20px",
            zIndex: 60,
          }}
        >
          <div
            style={{
              width: "min(560px, 100%)",
              background: "#fff",
              borderRadius: "18px",
              padding: "18px",
              border: "1px solid rgba(15, 23, 42, 0.08)",
              boxShadow: "0 10px 40px rgba(15, 23, 42, 0.14)",
              display: "grid",
              gap: "12px",
            }}
          >
            <h3 style={{ margin: 0 }}>Request data purchase</h3>
            <p style={{ color: "#5b6475", margin: 0 }}>
              Choose a vendor. They will receive a notification in Biggi Data.
            </p>
            <label style={{ display: "grid", gap: "6px", fontSize: "14px" }}>
              Vendor
              <select
                value={requestForm.vendorUserId}
                onChange={(e) =>
                  setRequestForm((prev) => ({ ...prev, vendorUserId: e.target.value }))
                }
                style={{
                  padding: "10px 12px",
                  borderRadius: "12px",
                  border: "1px solid rgba(15, 23, 42, 0.14)",
                }}
              >
                <option value="">Select vendor</option>
                {vendors.map((vendor) => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.username} ({vendor.phoneNumber})
                  </option>
                ))}
              </select>
            </label>
            <label style={{ display: "grid", gap: "6px", fontSize: "14px" }}>
              Phone number
              <input
                value={requestForm.phoneNumber}
                onChange={(e) =>
                  setRequestForm((prev) => ({ ...prev, phoneNumber: e.target.value }))
                }
                style={{
                  padding: "10px 12px",
                  borderRadius: "12px",
                  border: "1px solid rgba(15, 23, 42, 0.14)",
                }}
              />
            </label>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <GhostButton onClick={() => setRequestVendorOpen(false)}>
                Cancel
              </GhostButton>
              <Button
                onClick={() => {
                  setError("");
                  const token = getAuthToken();
                  if (!token) return;
                  if (!requestForm.vendorUserId || !requestForm.phoneNumber) {
                    setError("Vendor and phone number are required.");
                    return;
                  }
                  createBiggiHouseVendorRequest(
                    {
                      vendorUserId: requestForm.vendorUserId,
                      phoneNumber: requestForm.phoneNumber,
                      network: requestForm.network || undefined,
                      planId: requestForm.planId || undefined,
                      note: requestForm.note || undefined,
                    },
                    token
                  )
                    .then(() => {
                      setRequestVendorOpen(false);
                    })
                    .catch((err) => setError(err?.message || "Request failed."));
                }}
              >
                Send request
              </Button>
            </div>
            {error && <p style={{ color: "#c02626", margin: 0 }}>{error}</p>}
          </div>
        </div>
      )}
    </Wrapper>
  );
}
