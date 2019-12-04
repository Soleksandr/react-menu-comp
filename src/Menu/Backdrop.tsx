import React from 'react';
import styled from '@emotion/styled';


export const zIndex = 999;

const BackdropStyled = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${zIndex}
`


export const Backdrop: React.FC<{ onClick: () => any }> = ({ children, onClick }) => {
  return (
    <BackdropStyled onClick={onClick}>{children}</BackdropStyled>
  );
};