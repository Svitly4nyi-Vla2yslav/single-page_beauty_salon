import styled from 'styled-components';
import type { HeroStat } from './types';

type HeroStatsProps = {
  stats: HeroStat[];
};

const StatsGrid = styled.div`
  display: grid;
  gap: 0.54rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const StatCard = styled.article`
  display: grid;
  gap: 0.28rem;
  min-width: 0;
  min-height: 5rem;
  padding: 0.28rem 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  box-shadow: none;

  @media (max-width: 767px) {
    min-height: 4.85rem;

    &:last-child {
      grid-column: 1 / -1;
    }
  }
`;

const StatIndex = styled.p`
  justify-self: end;
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(107, 83, 64, 0.38);
`;

const StatValue = styled.p`
  max-width: 10ch;
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.16rem, 1.3vw, 1.52rem);
  line-height: 0.95;
  color: #423026;
`;

const StatLabel = styled.p`
  max-width: 15ch;
  font-size: 0.72rem;
  line-height: 1.38;
  color: rgba(83, 64, 50, 0.78);
  overflow-wrap: anywhere;
`;

export const HeroStats = ({ stats }: HeroStatsProps) => (
  <StatsGrid>
    {stats.map((stat, index) => (
      <StatCard key={stat.id}>
        <StatIndex>{String(index + 1).padStart(2, '0')}</StatIndex>
        <StatValue>{stat.value}</StatValue>
        <StatLabel>{stat.label}</StatLabel>
      </StatCard>
    ))}
  </StatsGrid>
);
