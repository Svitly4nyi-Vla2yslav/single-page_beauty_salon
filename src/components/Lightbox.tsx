import { ReactNode, useEffect } from 'react';

type LightboxProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  closeLabel: string;
};

export const Lightbox = ({ open, title, onClose, children, closeLabel }: LightboxProps) => {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90] bg-black/65 px-4 py-8 backdrop-blur-lg">
      <div className="mx-auto flex h-full max-w-5xl flex-col rounded-[2rem] bg-white p-6 shadow-2xl md:p-8">
        <div className="flex items-center justify-between gap-4 border-b border-black/10 pb-5">
          <h3 className="font-display text-3xl text-ink">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-black/65 transition hover:border-black/20 hover:text-black"
          >
            {closeLabel}
          </button>
        </div>
        <div className="mt-6 min-h-0 flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
};
