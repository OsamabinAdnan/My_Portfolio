'use client';

import { useEffect, useRef } from 'react';

const ACCENT = '#a73dff';
const ICON_SIZE = 34;
const ICON_ROTATION_DEG = -18;
const TRANSITION_MS = 50;
const TRANSFORM_EASE = 'linear';
const FOLLOW = 0.35;
const SNAP_DISTANCE = 120;
const SNAP_FOLLOW = 0.95;

function iconTransform(x: number, y: number) {
  return `translate3d(${x}px, ${y}px, 0) rotate(${ICON_ROTATION_DEG}deg)`;
}

function isTextInput(el: Element | null) {
  if (!el) return false;
  return !!el.closest('input,textarea,[contenteditable="true"],[contenteditable=""]');
}

function isInteractive(el: Element | null) {
  if (!el) return false;
  return !!el.closest('a,button,summary,[role="button"],[role="link"],[data-cursor="pointer"],.group,article,section');
}

export function CustomCursor() {
  const iconRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const visible = useRef(false);

  useEffect(() => {
    document.documentElement.classList.add('has-custom-cursor');

    const icon = iconRef.current;
    if (!icon) return;

    const onEnter = () => {
      visible.current = true;
      icon.style.opacity = '1';

      current.current.x = pos.current.x;
      current.current.y = pos.current.y;
      icon.style.transform = iconTransform(current.current.x, current.current.y);
    };

    const onLeave = () => {
      visible.current = false;
      icon.style.opacity = '0';
    };

    const onMove = (e: PointerEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;

      if (!visible.current) onEnter();

      const t = e.target as Element | null;
      const text = isTextInput(t);
      if (text) {
        icon.style.opacity = '0';
        return;
      }

      icon.style.opacity = '1';

      const interactive = isInteractive(t);
      if (interactive) {
        // Invert against whatever is underneath
        icon.style.mixBlendMode = 'difference';
        icon.style.color = '#ffffff';
        icon.style.filter = 'none';
      } else {
        icon.style.mixBlendMode = 'normal';
        icon.style.color = ACCENT;
        icon.style.filter = `drop-shadow(0 0 10px ${ACCENT}66)`;
      }
    };

    const tick = () => {
      const dx = pos.current.x - current.current.x;
      const dy = pos.current.y - current.current.y;
      const dist = Math.hypot(dx, dy);

      const follow = dist > SNAP_DISTANCE ? SNAP_FOLLOW : FOLLOW;
      current.current.x += dx * follow;
      current.current.y += dy * follow;

      icon.style.transform = iconTransform(current.current.x, current.current.y);
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerenter', onEnter);
    window.addEventListener('pointerleave', onLeave);

    raf.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerenter', onEnter);
      window.removeEventListener('pointerleave', onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={iconRef}
      aria-hidden
      className="fixed left-0 top-0 z-[9999] pointer-events-none opacity-0"
      style={{
        width: ICON_SIZE,
        height: ICON_SIZE,
        marginLeft: -ICON_SIZE / 2,
        marginTop: -ICON_SIZE / 2,
        color: ACCENT,
        filter: `drop-shadow(0 0 10px ${ACCENT}66)`,
        willChange: 'transform',
        transition: `opacity 160ms ease, transform ${TRANSITION_MS}ms ${TRANSFORM_EASE}, color 120ms ease, filter 120ms ease`,
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
        <path fill="currentColor" d="M4.5.79v22.42l6.56-6.57h9.29L4.5.79z" />
      </svg>
    </div>
  );
}
