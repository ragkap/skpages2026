'use client';
import { useState } from 'react';

interface ToggleSwitchProps {
  label: string;
  activeColor?: string;
  defaultOn?: boolean;
  onChange?: (on: boolean) => void;
}

export default function ToggleSwitch({ label, activeColor = 'var(--accent)', defaultOn = false, onChange }: ToggleSwitchProps) {
  const [on, setOn] = useState(defaultOn);

  const toggle = () => {
    const next = !on;
    setOn(next);
    onChange?.(next);
  };

  return (
    <div className="toggle-wrap">
      <span>{label}</span>
      <div
        className={`toggle${on ? ' on' : ''}`}
        onClick={toggle}
        style={on ? { background: activeColor } : undefined}
      >
        <div className="toggle-knob" />
      </div>
    </div>
  );
}
