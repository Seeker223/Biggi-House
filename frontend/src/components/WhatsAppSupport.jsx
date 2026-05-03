import { useMemo, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  position: fixed;
  right: 16px;
  bottom: 88px;
  z-index: 60;
  display: grid;
  gap: 10px;

  @media (max-width: 640px) {
    right: 12px;
    bottom: 96px;
  }
`;

const Panel = styled.div`
  width: min(300px, calc(100vw - 24px));
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.14);
  padding: 12px;
  display: grid;
  gap: 10px;
`;

const PanelTitle = styled.div`
  font-weight: 900;
  color: #0f172a;
`;

const NumberRow = styled.a`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #f8fafc;
  color: inherit;

  &:hover {
    background: #eef2ff;
  }
`;

const NumberText = styled.div`
  font-weight: 900;
  letter-spacing: 0.3px;
`;

const Chip = styled.span`
  background: #25d366;
  color: #fff;
  padding: 6px 10px;
  border-radius: 999px;
  font-weight: 900;
  font-size: 12px;
`;

const FloatButton = styled.button`
  border: none;
  border-radius: 999px;
  padding: 12px 14px;
  cursor: pointer;
  font-weight: 900;
  color: #0f172a;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);

  &:hover {
    transform: translateY(-1px);
  }
`;

const Backdrop = styled.button`
  position: fixed;
  inset: 0;
  border: none;
  background: transparent;
  z-index: 55;
`;

function toWaLink(nigeriaNumber) {
  const digits = String(nigeriaNumber || '').replace(/\D/g, '');
  if (!digits) return '';
  const withCountry = digits.startsWith('0') ? '234' + digits.slice(1) : digits;
  return 'https://wa.me/' + withCountry;
}

export default function WhatsAppSupport() {
  const [open, setOpen] = useState(false);

  const numbers = useMemo(
    () => [
      { label: 'WhatsApp 1', number: '09050347019' },
      { label: 'WhatsApp 2', number: '09131556692' },
    ],
    []
  );

  return (
    <>
      {open ? (
        <Backdrop type='button' aria-label='Close WhatsApp contacts' onClick={() => setOpen(false)} />
      ) : null}
      <Wrap>
        {open ? (
          <Panel role='dialog' aria-label='WhatsApp contacts'>
            <PanelTitle>Contact us on WhatsApp</PanelTitle>
            {numbers.map((n) => (
              <NumberRow key={n.number} href={toWaLink(n.number)} target='_blank' rel='noreferrer'>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#64748b' }}>{n.label}</div>
                  <NumberText>{n.number}</NumberText>
                </div>
                <Chip>Chat</Chip>
              </NumberRow>
            ))}
          </Panel>
        ) : null}

        <FloatButton type='button' onClick={() => setOpen((p) => !p)} aria-expanded={open}>
          WhatsApp
        </FloatButton>
      </Wrap>
    </>
  );
}
