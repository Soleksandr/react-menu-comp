import React from 'react';
import styled from '@emotion/styled';
import { StyledButton } from '../StyledButton'
import { Button, ButtonSize, ButtonShape } from '../Button'
import { CaretDownIcon } from '../Icon/types/CaretDownIcon'

const ToggleButtonWrapper = styled.div<any>(() => ({
  display: 'flex',
  alignItems: 'center'
}))

const ToggleButtonContent = styled.div<any>(() => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: 15
  // height: 29,
}))

const ToggleButtonButton = styled<any>(Button)(() => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 'auto',
  margin: 3
}))

// const ArrowDown = styled.div({
//   marginLeft: 15,
//   fontSize: '1.5em'
// })

interface IToggleButtonProps {
  // onClick: (e: MouseEvent) => any;
  standAloneButton?: boolean;
}

export const ToggleButton: React.FC<IToggleButtonProps> = React.forwardRef(({ children, standAloneButton = false, ...other }, ref) => {
  // console.log(other)
  return (
    standAloneButton 
      ? <ToggleButtonWrapper ref={ref}>
          <ToggleButtonContent>{children}</ToggleButtonContent>
          <StyledButton iconOnly shape={ButtonShape.rightCap} size={ButtonSize.small} ref={ref} {...other} >
            <CaretDownIcon size={10}  />
          </StyledButton>
        </ToggleButtonWrapper>
      : <>
          <ToggleButtonButton ref={ref} {...other} >
            <ToggleButtonContent>{children}</ToggleButtonContent>
            <CaretDownIcon size={10} />
          </ToggleButtonButton>
        </>
  );
});

ToggleButton.displayName = 'ToggleButton'