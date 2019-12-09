import React from 'react';
import styled from '@emotion/styled';

interface IMenuItemProps {
  children: React.ReactElement<any>;
}

const LiStyled = styled.li({
  'button': {
    padding: '10px 15px',
    margin: 0,
    border: 'none',
    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor: 'grey'
    }
  }
})

export const MenuItem: React.FC<IMenuItemProps> = ({ children }) => {
  return (
    <LiStyled><button>{children}</button></LiStyled>
  );
}; 