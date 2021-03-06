import { type, Typeface, TypeSize } from '~libs/style/type';
import React from 'react';
import styled from 'react-emotion';
import { COLORS } from '~libs/style';
import { cardActionable } from '~libs/style/cards';

const Button = styled.button<{ disabled: boolean }>(
  ({ disabled }) => ({
    textAlign: 'center',
    background: disabled ? COLORS.GREY_WINTER : COLORS.BRAND_RED,
    borderRadius: 6,
    padding: '0.5rem',
    display: 'block',
    width: '100%',
    border: 0,
    textDecoration: 'none',
    marginTop: '1rem',
    boxSizing: 'border-box',
  }),
  cardActionable,
);

const ButtonLink = Button.withComponent('a');

const Title = styled.div({
  ...type(TypeSize.DoublePica, Typeface.Secondary),
  fontWeight: 600,
  color: '#ffffff',
});

const Subtitle = styled.div({
  opacity: 0.6,
  ...type(TypeSize.LongPrimer),
  color: '#ffffff',
});

interface BuyButtonProps {
  href?: string;
  onClick?(e: React.MouseEvent<HTMLButtonElement>): void;
  title: string;
  subtitle?: string;
  disabled?: boolean;
}

export const BuyButton: React.SFC<BuyButtonProps> = ({
  title,
  subtitle,
  href,
  onClick,
  disabled,
}) => {
  return href ? (
    <ButtonLink href={href} disabled={!!disabled}>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </ButtonLink>
  ) : (
    <Button onClick={onClick} disabled={!!disabled}>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Button>
  );
};
