import React from 'react';
import styled from '@emotion/styled';

const MenuLIstContainer = styled.div({
  position: 'relative'
})

const MenuListStyled = styled.ul<{ top: number}>(({ top }) => ({
  margin: 0,
  padding: 7,
  listStyleType: 'none',
  position: 'fixed',
  boxShadow: '0 2px 10px 1px black',
  left: top,
  backgroundColor: 'white',
  transition: 'all .2s'
}))

interface IMenuLIstProps {
  isOpen?: boolean;
}

export const MenuLIst: React.FC<IMenuLIstProps> = ({ children, ...rest }) => {
  const [ offset, setOffset ] = React.useState(20);

  React.useEffect(() => {
    setTimeout(() => setOffset(0))
  }, []);
  console.log('-rendered-', offset)

  return (
    <MenuLIstContainer>
      <MenuListStyled top={offset}>{children}</MenuListStyled>
    </MenuLIstContainer>
  );
};