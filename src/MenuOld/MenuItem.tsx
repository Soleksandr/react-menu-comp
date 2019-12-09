import React from 'react';
import styled from '@emotion/styled';

interface MenuItemProps {
  as?: 'a' | 'button';
  onClick: (e: React.SyntheticEvent<HTMLLIElement>) => any;
}

export const LiStyled = styled.li({
  // padding: '8px 10px',
  listStyleType: 'none',
  margin: 0,
  whiteSpace: 'nowrap',
  ':hover': {
    backgroundColor: '#DFDFDF'
  },
   '&:first-of-type:hover': {
      borderRadius: '5px 5px 0 0'
    },
    '&:last-child:hover': {
      borderRadius: ' 0 0 5px 5px'
    },
  
  '& > a, & > button': {
    display: 'flex',
    border: 'none',
    fontSize: '1em',
    textAlign: 'left',
    padding: '7px 12px',
    background: 'transparent',
    transition: 'all .3s',
  }
})

export const MenuItem: React.FC<MenuItemProps> = ({ children, onClick, as = 'button' }) => {
  return (
    <LiStyled>
      {
        React.createElement(as, { onClick, href: '#' }, children)
      }
    </LiStyled>
  )
}