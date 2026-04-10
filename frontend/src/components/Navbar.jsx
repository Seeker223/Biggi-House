import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import Container from "./Container";

const NavWrap = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const NavInner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  gap: 16px;
`;

const Brand = styled(Link)`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: -0.5px;
`;

const NavGroup = styled.nav`
  display: flex;
  align-items: center;
  gap: 18px;

  @media (max-width: 860px) {
    display: none;
  }
`;

const NavItem = styled(NavLink)`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.muted};

  &.active {
    color: ${({ theme }) => theme.colors.ink};
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const OutlineButton = styled(Link)`
  padding: 10px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  font-weight: 600;
`;

const SolidButton = styled(Link)`
  padding: 10px 18px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 600;
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export default function Navbar() {
  return (
    <NavWrap>
      <NavInner>
        <Brand to="/">biggiHouse</Brand>
        <NavGroup>
          <NavItem to="/" end>
            Home
          </NavItem>
          <NavItem to="/houses">Houses</NavItem>
          <NavItem to="/dashboard">Dashboard</NavItem>
        </NavGroup>
        <Actions>
          <OutlineButton to="/login">Login</OutlineButton>
          <SolidButton to="/signup">Get Started</SolidButton>
        </Actions>
      </NavInner>
    </NavWrap>
  );
}
