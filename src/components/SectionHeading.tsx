import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: 'left' | 'center';
  className?: string;
};

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) => (
  <div
    className={cn(
      'max-w-3xl',
      align === 'center' ? 'mx-auto text-center' : 'text-left',
      className,
    )}
  >
    <motion.span
      className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-black/60"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6 }}
    >
      <span className="h-2 w-2 rounded-full bg-gold" />
      {eyebrow}
    </motion.span>
    <h2 className="mt-6 font-display text-4xl leading-tight text-ink md:text-5xl lg:text-6xl">
      {title}
    </h2>
    <p className="mt-5 text-base leading-8 text-black/65 md:text-lg">{description}</p>
  </div>
);
