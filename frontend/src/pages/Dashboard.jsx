import styled from "styled-components";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import WalletCard from "../components/WalletCard";
import {
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
  width: ${({ $value }) => `${Math.max(0, Math.min(100, Number($value || 0)))}%`};
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
  const [success, setSuccess] = useState("");

  const token = useMemo(() => getAuthToken(), []);

  const reload = useCallback(() => {
    if (!token) return;
    setLoadingData(true);
    setError("");
    Promise.all([
      getBiggiHouseWallet(token).then((data) => setWallet(data)),
      getBiggiHouseVendors(token).then((data) => setVendors(data || [])),
      getBiggiHouseEligibility(token).then((data) => setEligibility(data)),
      getBiggiHouseMemberships(token).then((data) => setMemberships(data || [])),
    ])
      .catch((err) => setError(err?.message || "Unable to load dashboard data."))
      .finally(() => setLoadingData(false));
  }, [token]);

  useEffect(() => {
    reload();

    const onFocus = () => reload();
    const onVisibility = () => {
      if (document.visibilityState === "visible") reload();
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reload]);

  const walletBalance = Number(wallet?.balance || 0);
  const latestHouse = memberships[0]?.house || null;
  const latestJoin = (wallet?.transactions || []).find((item) => item.type === "house_join");
  const weeklyPayoutTime = `Fridays ${"\u00B7"} 6:00 PM`;

  const nextPayout = useMemo(() => {
    const now = new Date();
    const next = new Date(now);
    const targetDow = 5; // Fri
    const currentDow = next.getDay();
    let addDays = (targetDow - currentDow + 7) % 7;
    if (addDays === 0 && next.getHours() >= 18) addDays = 7;
    next.setDate(next.getDate() + addDays);
    next.setHours(18, 0, 0, 0);
    return next.toLocaleString("en-NG", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  const purchasesThisWeek = Number(eligibility?.purchasesThisWeek || 0);
  const eligible = Boolean(eligibility?.eligible);
  const eligibilityProgress = eligible ? 100 : Math.min(80, purchasesThisWeek * 50);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLeaveHouse = () => {
    // Memberships are persisted server-side; leaving is not implemented yet.
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
          {loadingData && (
            <p style={{ color: "#5b6475", marginTop: "10px" }}>Refreshing...</p>
          )}
          {error && <p style={{ color: "#c02626", marginTop: "10px" }}>{error}</p>}
          {success && (
            <p style={{ color: "#15803d", marginTop: "10px" }}>{success}</p>
          )}
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {memberships.length > 0 && (
            <WarningButton onClick={handleLeaveHouse}>View houses</WarningButton>
          )}
          <GhostButton onClick={handleLogout}>Logout</GhostButton>
        </div>
      </Header>

      <Grid>
        <WalletCard
          balance={walletBalance}
          currentHouse={latestHouse ? `House ${latestHouse.number}` : "Not joined"}
          lastBalance={latestJoin?.meta?.previousBalance ?? walletBalance}
          weeklyPayoutTime={weeklyPayoutTime}
        />
        <Card>
          <CardLabel>Current house</CardLabel>
          <CardValue>
            {latestHouse ? `House ${latestHouse.number}` : "Not joined"}
          </CardValue>
          <ProgressWrap>
            <Progress $value={memberships.length ? 70 : 15} />
          </ProgressWrap>
          <p style={{ color: "#5b6475", marginTop: "10px" }}>
            {memberships.length ? "Your weekly cycle is active." : "Join a house to start."}
          </p>
        </Card>
        <Card>
          <CardLabel>Next payout</CardLabel>
          <CardValue>{nextPayout}</CardValue>
          <p style={{ color: "#5b6475", marginTop: "10px" }}>
            Weekly payout time: {weeklyPayoutTime}
          </p>
        </Card>
      </Grid>

      <Grid style={{ marginTop: "24px" }}>
        <Card>
          <CardLabel>Weekly eligibility</CardLabel>
          <CardValue>{eligible ? "Eligible" : "Not eligible"}</CardValue>
          <ProgressWrap>
            <Progress $value={eligibilityProgress} />
          </ProgressWrap>
          <p style={{ color: "#5b6475", marginTop: "10px" }}>
            Purchases this week for {eligibility?.phoneNumber || "your number"}:{" "}
            <strong>{purchasesThisWeek}</strong>
          </p>
        </Card>
        <Card>
          <CardLabel>BiggiHouse wallet</CardLabel>
          <CardValue>
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
              maximumFractionDigits: 0,
            }).format(walletBalance)}
          </CardValue>
          <p style={{ color: "#5b6475", marginTop: "10px" }}>
            {latestJoin?.meta?.houseNumber
              ? `Last paid: House ${latestJoin.meta.houseNumber}`
              : "No house payment yet."}
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
            <ProgressWrap>
              <Progress $value={eligibilityProgress} />
            </ProgressWrap>
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
          </div>
        </Card>
        <Card>
          <CardLabel>Vendors (Biggi Data merchants)</CardLabel>
          {vendors.length ? (
            <div style={{ marginTop: "12px", display: "grid", gap: "10px" }}>
              {vendors.slice(0, 6).map((vendor) => (
                <div
                  key={vendor.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    padding: "12px 14px",
                    borderRadius: "14px",
                    border: "1px solid rgba(15, 23, 42, 0.08)",
                    background: "#fff",
                  }}
                >
                  <div style={{ display: "grid", gap: "2px" }}>
                    <strong style={{ fontSize: "14px" }}>{vendor.username}</strong>
                    <span style={{ color: "#5b6475", fontSize: "13px" }}>
                      {vendor.phoneNumber}
                    </span>
                  </div>
                  <SecondaryButton
                    onClick={() => {
                      setRequestForm((prev) => ({
                        ...prev,
                        vendorUserId: vendor.id,
                      }));
                      setRequestVendorOpen(true);
                    }}
                  >
                    Request
                  </SecondaryButton>
                </div>
              ))}
              {vendors.length > 6 && (
                <p style={{ color: "#5b6475", fontSize: "13px" }}>
                  Showing 6 of {vendors.length} vendors.
                </p>
              )}
            </div>
          ) : (
            <p style={{ color: "#5b6475", marginTop: "10px" }}>
              No vendors available yet.
            </p>
          )}
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
                  setSuccess("");
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
                      setSuccess("Vendor request sent. The vendor was notified in Biggi Data.");
                      reload();
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
