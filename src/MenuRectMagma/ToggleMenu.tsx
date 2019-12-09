import React from 'react';
import styled from '@emotion/styled';
import { Button, CaretDownIcon, ButtonSize, ButtonShape } from 'react-magma-dom';
import { StyledButton } from '../components/StyledButton'

const ToggleWrapper = styled.div<any>((props) => ({
  display: 'flex',
  alignItems: 'center'
}))

const ToggleContent = styled.div<any>((props) => ({
  display: 'flex',
  alignItems: 'center',
  height: 29,
}))

const ToggleButton = styled<any>(Button)((props) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 'auto',
  margin: 3
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
          <StyledButton iconOnly shape={ButtonShape.rightCap} size={ButtonSize.small} ref={ref} {...other} >
            <CaretDownIcon size={12}  />
          </StyledButton>
        </ToggleWrapper>
      : <>
          <ToggleButton ref={ref} {...other} >
            {children}
            <CaretDownIcon />
          </ToggleButton>
        </>
  );
});