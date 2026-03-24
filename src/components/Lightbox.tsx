import { ReactNode, useEffect } from 'react';
import styled from 'styled-components';

type LightboxProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  closeLabel: string;
};

const Overlay = styled.div.attrs({
  className: 'fixed inset-0 z-[90] bg-black/65 px-4 py-8 backdrop-blur-lg',
})``;

const Panel = styled.div.attrs({
  className: 'mx-auto flex h-full max-w-5xl flex-col rounded-[2rem] bg-white p-6 shadow-2xl md:p-8',
})``;

const Header = styled.div.attrs({
  className: 'flex items-center justify-between gap-4 border-b border-black/10 pb-5',
})``;

const Title = styled.h3.attrs({
  className: 'font-display text-3xl text-ink',
})``;

const CloseButton = styled.button.attrs({
  className:
    'rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-black/65 transition hover:border-black/20 hover:text-black',
})``;

const Body = styled.div.attrs({
  className: 'mt-6 min-h-0 flex-1 overflow-auto',
})``;

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
    <Overlay>
      <Panel>
        <Header>
          <Title>{title}</Title>
          <CloseButton type="button" onClick={onClose}>
            {closeLabel}
          </CloseButton>
        </Header>
        <Body>{children}</Body>
      </Panel>
    </Overlay>
  );
};
