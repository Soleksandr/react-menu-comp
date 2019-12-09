import React from 'react';
import styled from '@emotion/styled';
import { LiStyled } from './MenuItem';

interface MenuItemProps {
  onClick?: (e: React.SyntheticEvent<HTMLLIElement>) => any;
  reference: string;
  target?: '_blank' | '_self' | '_top' | '_parent';
}

const LinkContainer = styled(LiStyled)({
  padding: 0,
})

const StyledLink = styled.a({
  display: 'inline-block',
  textDecoration: 'none',
  padding: '8px 10px',
  width: 'fill-available',

'&:visited': {
  color: 'inherit',
},
'&:active': {
  color: 'inherit',
}
})

export const MenuLink: React.FC<MenuItemProps> = ({ children, reference, target = '_blank' }) => {
  return (
    <LinkContainer onMouseDown={(e) => e.preventDefault()}>
      <StyledLink href={reference} target={target}> 
        {children}
      </StyledLink>
    </LinkContainer>
  )
}