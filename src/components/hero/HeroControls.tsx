import styled from 'styled-components';
import type { HeroSlide } from './types';

type HeroControlsProps = {
  slides: HeroSlide[];
  activeSlide: number;
  progress: number;
  isPaused: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
};

const ControlsShell = styled.div`
  display: grid;
  gap: 0.72rem;
  padding-top: 0.82rem;
  border-top: 0;
`;

const TopRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.72rem;
  align-items: center;
`;

const ArrowGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.46rem;
`;

const ArrowButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border: 1px solid rgba(255, 248, 242, 0.32);
  border-radius: 999px;
  background: rgba(255, 248, 242, 0.12);
  color: rgba(79, 57, 43, 0.92);
  font-size: 0.95rem;
  box-shadow: none;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    border-color: rgba(255, 248, 242, 0.46);
    background: rgba(255, 248, 242, 0.22);
    outline: none;
  }
`;

const StatusCluster = styled.div`
  display: grid;
  gap: 0.38rem;
  min-width: 0;
`;

const StatusMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.7rem;
`;

const Counter = styled.p`
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.27em;
  text-transform: uppercase;
  color: rgba(107, 83, 64, 0.6);
`;

const AutoplayPill = styled.span<{ $paused: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 5rem;
  padding: 0.3rem 0.58rem;
  border: 1px solid ${({ $paused }) => ($paused ? 'rgba(200, 162, 76, 0.28)' : 'rgba(151, 124, 98, 0.12)')};
  border-radius: 999px;
  background: ${({ $paused }) => ($paused ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255, 252, 248, 0.52)')};
  color: ${({ $paused }) => ($paused ? '#9a7430' : 'rgba(107, 83, 64, 0.58)')};
  font-size: 0.52rem;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  white-space: nowrap;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 0.22rem;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(172, 144, 118, 0.14);
`;

const ProgressFill = styled.span<{ $width: number }>`
  display: block;
  width: ${({ $width }) => `${$width}%`};
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #e5c782, #ca9f4f 58%, rgba(170, 198, 247, 0.9));
  transition: width 0.22s linear;
`;

const Pager = styled.div`
  display: none;

  @media (min-width: 640px) {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.48rem;
  }
`;

const PagerButton = styled.button<{ $active: boolean }>`
  display: grid;
  gap: 0.14rem;
  min-width: 0;
  padding: 0.56rem 0.64rem;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(255, 248, 242, 0.28)' : 'rgba(255, 248, 242, 0.14)')};
  border-radius: 0.88rem;
  background: transparent;
  text-align: left;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    border-color: rgba(255, 248, 242, 0.32);
    background: rgba(255, 248, 242, 0.08);
    outline: none;
  }
`;

const PagerIndex = styled.span`
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(107, 83, 64, 0.42);
`;

const PagerLabel = styled.span`
  font-size: 0.68rem;
  line-height: 1.3;
  color: #5a4535;
`;

export const HeroControls = ({
  slides,
  activeSlide,
  progress,
  isPaused,
  onPrev,
  onNext,
  onSelect,
}: HeroControlsProps) => (
  <ControlsShell>
    <TopRow>
      <ArrowGroup>
        <ArrowButton type="button" onClick={onPrev} aria-label="Previous hero slide">
          &#8249;
        </ArrowButton>
        <ArrowButton type="button" onClick={onNext} aria-label="Next hero slide">
          &#8250;
        </ArrowButton>
      </ArrowGroup>

      <StatusCluster>
        <StatusMeta>
          <Counter>
            {String(activeSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </Counter>
          <AutoplayPill $paused={isPaused}>{isPaused ? 'Paused' : 'Autoplay'}</AutoplayPill>
        </StatusMeta>
        <ProgressTrack aria-hidden="true">
          <ProgressFill $width={Math.max(0, Math.min(progress * 100, 100))} />
        </ProgressTrack>
      </StatusCluster>
    </TopRow>

    <Pager>
      {slides.map((slide, index) => (
        <PagerButton
          key={slide.id}
          type="button"
          onClick={() => onSelect(index)}
          $active={index === activeSlide}
          aria-pressed={index === activeSlide}
        >
          <PagerIndex>{String(index + 1).padStart(2, '0')}</PagerIndex>
          <PagerLabel>{slide.subtitle}</PagerLabel>
        </PagerButton>
      ))}
    </Pager>
  </ControlsShell>
);
