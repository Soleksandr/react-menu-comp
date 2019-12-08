import React from 'react';
import styled from '@emotion/styled';

const ToggleWrapper = styled.div<any>((props) => ({
  display: 'flex',
  alignItems: 'center'
}))

const ToggleContent = styled.div<any>((props) => ({
  display: 'flex',
  alignItems: 'center'
}))

const ToggleButton = styled.button<any>((props) => ({
  padding: '10px 15px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'blue'
}))

const ArrowDown = styled.div({
  marginLeft: 15,
  fontSize: '1.5em'
})

interface IToggleMenuProps {
  // onClick: (e: MouseEvent) => any;
  standAloneButton?: boolean;
}

export const ToggleMenu: React.FC<IToggleMenuProps> = React.forwardRef(({ children, standAloneButton = false, ...other }, ref) => {
  // console.log(other)
  return (
    standAloneButton 
      ? <ToggleWrapper>
          <ToggleContent style={{backgroundColor: 'blue'}}>{children}</ToggleContent>
          <ToggleButton ref={ref} {...other} >
            <ArrowDown>&#8661;</ArrowDown>
          </ToggleButton>
        </ToggleWrapper>
      : <>
          <ToggleButton ref={ref} {...other} >
            {children}
            <ArrowDown>&#8661;</ArrowDown>
          </ToggleButton>
        </>
  );
});