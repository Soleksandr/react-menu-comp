import React from 'react';
import styled from '@emotion/styled';

interface MenuItemProps {
  onClick: (e: React.SyntheticEvent<HTMLLIElement>) => any;
}

export const LiStyled = styled.li(() => ({
  padding: '8px 10px',
  listStyleType: 'none',
  margin: 0,
  whiteSpace: 'nowrap',
  transition: 'all .3s',
  ':hover': {
    backgroundColor: '#DFDFDF'
  },
  '&:first-of-type:hover': {
    borderRadius: '5px 5px 0 0'
  },
  '&:last-child:hover': {
    borderRadius: ' 0 0 5px 5px'
  },
}))

export const MenuItem: React.FC<MenuItemProps> = ({ children, onClick }) => {
  return (
    <LiStyled onClick={onClick}>
      { children }
    </LiStyled>
  )
}