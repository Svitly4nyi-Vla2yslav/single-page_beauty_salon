import { useEffect, useRef, useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

type CursorVisualState = {
  active: boolean;
  blocked: boolean;
  label: string;
  pressed: boolean;
};

type CursorShellProps = {
  $active: boolean;
  $blocked: boolean;
  $pressed: boolean;
};

type CursorLabelProps = {
  $visible: boolean;
};

type CursorPoint = {
  x: number;
  y: number;
};

type CursorFrame = CursorPoint & {
  width: number;
  height: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const lerp = (from: number, to: number, factor: number) => from + (to - from) * factor;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const CursorReset = createGlobalStyle`
  @media (pointer: fine) and (min-width: 768px) {
    html[data-cursor-active='true'],
    html[data-cursor-active='true'] body,
    html[data-cursor-active='true'] a,
    html[data-cursor-active='true'] button,
    html[data-cursor-active='true'] input,
    html[data-cursor-active='true'] textarea,
    html[data-cursor-active='true'] select,
    html[data-cursor-active='true'] label,
    html[data-cursor-active='true'] [role='button'] {
      cursor: none !important;
    }
  }
`;

const CursorAura = styled.div.attrs({
  className: 'pointer-events-none fixed left-0 top-0 z-[70] hidden md:block',
})`
  width: 6.8rem;
  height: 6.8rem;
  border-radius: 999px;
  opacity: 0;
  background:
    radial-gradient(circle at 30% 30%, rgba(255, 252, 247, 0.26), transparent 34%),
    radial-gradient(circle at 70% 35%, rgba(110, 198, 255, 0.18), transparent 38%),
    radial-gradient(circle at 50% 70%, rgba(212, 175, 55, 0.18), transparent 42%);
  filter: blur(18px);
  will-change: transform, opacity;
`;

const CursorShell = styled.div.attrs({
  className: 'pointer-events-none fixed left-0 top-0 z-[71] hidden md:grid',
})<CursorShellProps>`
  position: fixed;
  place-items: center;
  min-width: 1.75rem;
  min-height: 1.75rem;
  padding: 0 0.7rem;
  overflow: hidden;
  border: 1px solid
    ${({ $active, $blocked }) =>
      $blocked
        ? 'rgba(255, 138, 138, 0.42)'
        : $active
          ? 'rgba(255, 247, 240, 0.52)'
          : 'rgba(255, 247, 240, 0.34)'};
  border-radius: 999px;
  background: ${({ $active, $blocked }) =>
    $blocked
      ? 'rgba(112, 23, 23, 0.22)'
      : $active
        ? 'rgba(255, 251, 246, 0.14)'
        : 'rgba(255, 251, 246, 0.08)'};
  box-shadow:
    0 16px 40px rgba(19, 14, 12, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  opacity: 0;
  will-change: transform, width, height, opacity;

  &::before {
    content: '';
    position: absolute;
    inset: -35%;
    background: ${({ $blocked }) =>
      $blocked
        ? 'conic-gradient(from 90deg, rgba(255, 160, 160, 0) 0deg, rgba(255, 160, 160, 0.42) 120deg, rgba(255, 160, 160, 0) 220deg)'
        : 'conic-gradient(from 90deg, rgba(212, 175, 55, 0) 0deg, rgba(212, 175, 55, 0.35) 110deg, rgba(110, 198, 255, 0.28) 210deg, rgba(255, 245, 233, 0) 320deg)'};
    opacity: ${({ $active }) => ($active ? 0.9 : 0.48)};
    filter: blur(12px);
    animation: ${spin} 8s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 1px;
    border-radius: inherit;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.03));
  }

  transform: ${({ $pressed }) => ($pressed ? 'translate(-50%, -50%) scale(0.96)' : 'translate(-50%, -50%) scale(1)')};
`;

const CursorLabel = styled.span<CursorLabelProps>`
  position: relative;
  z-index: 1;
  max-width: 9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.56rem;
  font-weight: 800;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #fff8f2;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'scale(1)' : 'scale(0.92)')};
  transition:
    opacity 160ms ease,
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
`;

const CursorDot = styled.div.attrs({
  className: 'pointer-events-none fixed left-0 top-0 z-[72] hidden md:block',
})<Pick<CursorShellProps, '$blocked' | '$pressed'>>`
  width: ${({ $pressed }) => ($pressed ? '0.48rem' : '0.58rem')};
  height: ${({ $pressed }) => ($pressed ? '0.48rem' : '0.58rem')};
  border-radius: 999px;
  border: 1px solid ${({ $blocked }) => ($blocked ? 'rgba(255, 184, 184, 0.72)' : 'rgba(255, 247, 240, 0.9)')};
  background: ${({ $blocked }) => ($blocked ? 'rgba(168, 44, 44, 0.92)' : 'rgba(20, 14, 11, 0.92)')};
  box-shadow:
    0 0 0 4px rgba(255, 251, 246, 0.16),
    0 8px 16px rgba(24, 18, 15, 0.22);
  opacity: 0;
  will-change: transform, opacity, width, height;
`;

const interactiveSelector =
  'a, button, [data-cursor], [data-cursor-label], input:not([type="hidden"]), textarea, select, label, [role="button"]';

const normalizeLabel = (value: string | null | undefined) =>
  (value ?? '').replace(/\s+/g, ' ').trim();

const deriveLabel = (element: HTMLElement, blocked: boolean) => {
  if (blocked) return 'Locked';

  const explicit = normalizeLabel(element.dataset.cursorLabel);
  if (explicit) return explicit;

  if (element instanceof HTMLAnchorElement) {
    const href = element.getAttribute('href') ?? '';

    if (href.startsWith('tel:')) return 'Call';
    if (href.startsWith('mailto:')) return 'Email';
    if (href.includes('wa.me')) return 'WhatsApp';
    if (href.includes('instagram.com')) return 'Instagram';
    if (href === '#booking') return 'Book';
  }

  const ariaLabel = normalizeLabel(element.getAttribute('aria-label'));
  if (ariaLabel && ariaLabel.length <= 16) return ariaLabel;

  const text = normalizeLabel(element.textContent);
  if (text && text.length <= 14) return text;

  if (element.tagName === 'BUTTON') return 'Open';
  if (element.tagName === 'A') return 'Explore';

  return '';
};

export const PremiumCursor = () => {
  const reducedMotion = useReducedMotionPreference();
  const shellRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const hoveredElementRef = useRef<HTMLElement | null>(null);
  const pointerTargetRef = useRef<CursorPoint>({ x: 0, y: 0 });
  const pointerCurrentRef = useRef<CursorPoint>({ x: 0, y: 0 });
  const shellTargetRef = useRef<CursorFrame>({ x: 0, y: 0, width: 28, height: 28 });
  const shellCurrentRef = useRef<CursorFrame>({ x: 0, y: 0, width: 28, height: 28 });
  const visibleRef = useRef(false);
  const visualStateRef = useRef<CursorVisualState>({
    active: false,
    blocked: false,
    label: '',
    pressed: false,
  });
  const [visible, setVisible] = useState(false);
  const [visualState, setVisualState] = useState<CursorVisualState>({
    active: false,
    blocked: false,
    label: '',
    pressed: false,
  });

  useEffect(() => {
    visualStateRef.current = visualState;
  }, [visualState]);

  useEffect(() => {
    if (reducedMotion || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    document.documentElement.dataset.cursorActive = 'true';

    const setVisibility = (nextVisible: boolean) => {
      if (visibleRef.current !== nextVisible) {
        visibleRef.current = nextVisible;
        setVisible(nextVisible);
      }
    };

    const updateTargetMeta = (nextTarget: HTMLElement | null) => {
      if (hoveredElementRef.current === nextTarget) {
        return;
      }

      hoveredElementRef.current = nextTarget;

      if (!nextTarget) {
        setVisualState((current) => ({
          ...current,
          active: false,
          blocked: false,
          label: '',
        }));
        return;
      }

      const blocked =
        nextTarget.matches(':disabled,[aria-disabled="true"]') ||
        window.getComputedStyle(nextTarget).cursor === 'not-allowed';

      setVisualState((current) => ({
        ...current,
        active: true,
        blocked,
        label: deriveLabel(nextTarget, blocked),
      }));
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;

      pointerTargetRef.current = {
        x: event.clientX,
        y: event.clientY,
      };

      setVisibility(true);

      const nextTarget = (event.target as Element | null)?.closest?.(interactiveSelector) as HTMLElement | null;
      updateTargetMeta(nextTarget);
    };

    const handlePointerLeave = () => {
      setVisibility(false);
      updateTargetMeta(null);
    };

    const handlePointerDown = () => {
      setVisualState((current) => ({
        ...current,
        pressed: true,
      }));
    };

    const handlePointerUp = () => {
      setVisualState((current) => ({
        ...current,
        pressed: false,
      }));
    };

    const animate = () => {
      const hoveredElement = hoveredElementRef.current;

      if (hoveredElement && document.body.contains(hoveredElement)) {
        const rect = hoveredElement.getBoundingClientRect();

        shellTargetRef.current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: clamp(rect.width + 28, 76, 168),
          height: clamp(rect.height + 18, 42, 58),
        };
      } else {
        shellTargetRef.current = {
          x: pointerTargetRef.current.x,
          y: pointerTargetRef.current.y,
          width: 28,
          height: 28,
        };
      }

      pointerCurrentRef.current = {
        x: lerp(pointerCurrentRef.current.x, pointerTargetRef.current.x, 0.34),
        y: lerp(pointerCurrentRef.current.y, pointerTargetRef.current.y, 0.34),
      };

      shellCurrentRef.current = {
        x: lerp(shellCurrentRef.current.x, shellTargetRef.current.x, 0.18),
        y: lerp(shellCurrentRef.current.y, shellTargetRef.current.y, 0.18),
        width: lerp(shellCurrentRef.current.width, shellTargetRef.current.width, 0.22),
        height: lerp(shellCurrentRef.current.height, shellTargetRef.current.height, 0.22),
      };

      const shellRotation = clamp(
        (shellTargetRef.current.x - shellCurrentRef.current.x) * 0.07,
        -6,
        6,
      );

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pointerCurrentRef.current.x}px, ${pointerCurrentRef.current.y}px, 0) translate(-50%, -50%)`;
        dotRef.current.style.opacity = visibleRef.current ? '1' : '0';
      }

      if (shellRef.current) {
        shellRef.current.style.transform = `translate3d(${shellCurrentRef.current.x}px, ${shellCurrentRef.current.y}px, 0) translate(-50%, -50%) rotate(${shellRotation}deg) scale(${visualStateRef.current.pressed ? 0.96 : 1})`;
        shellRef.current.style.width = `${shellCurrentRef.current.width}px`;
        shellRef.current.style.height = `${shellCurrentRef.current.height}px`;
        shellRef.current.style.opacity = visibleRef.current ? '1' : '0';
      }

      if (auraRef.current) {
        const auraWidth = shellCurrentRef.current.width * (visualStateRef.current.active ? 1.2 : 2.3);
        const auraHeight = shellCurrentRef.current.height * (visualStateRef.current.active ? 1.5 : 2.3);

        auraRef.current.style.transform = `translate3d(${shellCurrentRef.current.x}px, ${shellCurrentRef.current.y}px, 0) translate(-50%, -50%)`;
        auraRef.current.style.width = `${auraWidth}px`;
        auraRef.current.style.height = `${auraHeight}px`;
        auraRef.current.style.opacity = visibleRef.current ? (visualStateRef.current.active ? '0.88' : '0.58') : '0';
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      delete document.documentElement.dataset.cursorActive;

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return null;
  }

  return (
    <>
      <CursorReset />
      <CursorAura ref={auraRef} style={{ opacity: visible ? 1 : 0 }} />
      <CursorShell
        ref={shellRef}
        $active={visualState.active}
        $blocked={visualState.blocked}
        $pressed={visualState.pressed}
        style={{ opacity: visible ? 1 : 0 }}
      >
        <CursorLabel $visible={visualState.active && Boolean(visualState.label)}>
          {visualState.label}
        </CursorLabel>
      </CursorShell>
      <CursorDot
        ref={dotRef}
        $blocked={visualState.blocked}
        $pressed={visualState.pressed}
        style={{ opacity: visible ? 1 : 0 }}
      />
    </>
  );
};
