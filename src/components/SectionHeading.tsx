import { motion } from 'framer-motion';
import styled from 'styled-components';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: 'left' | 'center';
};

const HeadingShell = styled.div.attrs<{ $align: 'left' | 'center' }>(({ $align }) => ({
  className: $align === 'center' ? 'max-w-3xl mx-auto text-center' : 'max-w-3xl text-left',
}))``;

const Eyebrow = styled(motion.span).attrs({
  className:
    'inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-black/60',
})``;

const EyebrowDot = styled.span.attrs({
  className: 'h-2 w-2 rounded-full bg-gold',
})``;

const Title = styled.h2.attrs({
  className: 'mt-6 font-display text-4xl leading-tight text-ink md:text-5xl lg:text-6xl',
})``;

const Description = styled.p.attrs({
  className: 'mt-5 text-base leading-8 text-black/65 md:text-lg',
})``;

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) => (
  <HeadingShell $align={align}>
    <Eyebrow
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6 }}
    >
      <EyebrowDot />
      {eyebrow}
    </Eyebrow>
    <Title>{title}</Title>
    <Description>{description}</Description>
  </HeadingShell>
);
