import React from "react";

export function HouseIcon({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
    >
      <rect x="6" y="20" width="36" height="22" rx="6" fill="#DCE8FF" />
      <path d="M10 22L24 10L38 22" stroke="#1B4DB6" strokeWidth="3" />
      <rect x="18" y="26" width="12" height="14" rx="3" fill="#1B4DB6" />
    </svg>
  );
}

export function WalletIcon({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
    >
      <rect x="6" y="12" width="36" height="26" rx="8" fill="#E8F0FF" />
      <rect x="10" y="18" width="28" height="14" rx="6" fill="#1B4DB6" />
      <circle cx="32" cy="25" r="3" fill="#F59E0B" />
    </svg>
  );
}

export function PayoutIcon({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
    >
      <rect x="8" y="14" width="32" height="22" rx="8" fill="#FFF4DD" />
      <path
        d="M24 12V36"
        stroke="#F59E0B"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M18 20L24 14L30 20"
        stroke="#F59E0B"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShieldIcon({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
    >
      <path
        d="M24 8L38 14V24C38 32 31 38 24 40C17 38 10 32 10 24V14L24 8Z"
        fill="#E8F0FF"
        stroke="#1B4DB6"
        strokeWidth="2"
      />
      <path
        d="M18 24L22 28L30 20"
        stroke="#1B4DB6"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
