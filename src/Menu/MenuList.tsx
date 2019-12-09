import React from 'react';
import styled from '@emotion/styled';
import { 
  pickBoxShadow, 
  calculateIndentation, 
  getOffset, 
  Position, 
  Alignment, 
  Indention 
} from './utils';

export interface MenuListProps {
  toggleButtonRef: React.RefObject<any>;
  position: Position;
  alignment: Alignment;
  close: (e: MouseEvent) => any;
}

const MenuListStyled = styled.div<Indention & { position: Position}>(props => ({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: props.top,
  left: props.left ,
  zIndex: 1001,
}))

const UlStyled = styled.ul<Indention & { position: Position}>(({ top, left , position}) => ({
  position: 'relative',
  margin: 0,
  padding: '5px 0',
  borderRadius: '5px',
  listStyleType: 'none',
  zIndex: 1001,
  cursor: 'pointer',
  backgroundColor: '#FFFFFF',
  boxShadow: pickBoxShadow(position),
  transition: 'top .225s ease-in-out, left .225s ease-in-out',
  ...getOffset(position, Boolean(top && left))
}))

export const MenuList: React.FC<MenuListProps> = ({ 
  children, 
  toggleButtonRef, 
  close,
  position = 'bottom', 
  alignment = position === 'top' || position === 'bottom' ? 'left' : 'top'  
}) => {
  let SelfRef: React.RefObject<HTMLUListElement>;
  SelfRef =  React.useRef();

  const [boundingAnchorRect, changeBoundingAnchorRect] = React.useState()
  const [boundingMenuListRect, changeBoundingMenuListRect] = React.useState()

  const setBoundingAnchorRect = React.useCallback(() => {
    changeBoundingAnchorRect(toggleButtonRef.current.getBoundingClientRect())
  }, [toggleButtonRef])

  const timeoutIndex: any = React.useRef(null)
  
  const closeMenu = React.useCallback((e: any) => {
    // setTimeout gives opportunity cancel menu closing in case user navigate to one of menu list items
    timeoutIndex.current = setTimeout(() => close(e));
  }, [close, timeoutIndex])

  const focusMenuItem = React.useCallback((e: KeyboardEvent) => {
    if (e.keyCode === 40 || e.keyCode === 38) {
      e.preventDefault()

      const focusAbleList = Array.from(SelfRef.current.children)
        .map<any>((li: HTMLLIElement) => li.firstElementChild)
      const activeIndex = focusAbleList.findIndex((el: HTMLButtonElement) => el === document.activeElement)

      if (activeIndex === -1) {
        focusAbleList[0].focus()
      } else if (e.keyCode === 40 && activeIndex !== focusAbleList.length - 1) {
        focusAbleList[activeIndex + 1].focus()
      } else if (e.keyCode === 38 && activeIndex) {
        focusAbleList[activeIndex - 1].focus()
      }

      clearTimeout(timeoutIndex.current)
    }
  }, [SelfRef, timeoutIndex])

  React.useEffect(() => {
    const toggleButton = toggleButtonRef.current;
    const self = SelfRef.current;

    changeBoundingAnchorRect(toggleButton.getBoundingClientRect());
    changeBoundingMenuListRect(self.getBoundingClientRect())

    window.addEventListener('resize', setBoundingAnchorRect);
    toggleButton.addEventListener('keydown', focusMenuItem)
    self.addEventListener('focusout', closeMenu)
    self.addEventListener('keydown', focusMenuItem)

    return () => {
      window.removeEventListener('resize', setBoundingAnchorRect)
      toggleButton.removeEventListener('keydown', focusMenuItem)
      self.removeEventListener('focusout', closeMenu)
      self.removeEventListener('keydown', focusMenuItem)
    }
  }, [toggleButtonRef, SelfRef, setBoundingAnchorRect, focusMenuItem, closeMenu])

  const { top = 0, left = 0 } = boundingAnchorRect && boundingMenuListRect
    ? calculateIndentation(boundingAnchorRect, boundingMenuListRect, position, alignment) 
    : {}

  return (
    <MenuListStyled top={top} left={left} position={position}>
      <UlStyled 
        top={top} 
        left={left} 
        position={position} 
        ref={SelfRef}
        tabIndex={-1}
      >
        {
          React.Children.map(children, (child) => {
            return React.isValidElement(child) 
              ? React.cloneElement(
                  child, 
                  { 
                    onClick: (e: MouseEvent) => { 
                      child.props.onClick(e); 
                      close(e) 
                    } 
                  }
                )
              : child
          })
        }
      </UlStyled>
    </MenuListStyled>
  ) 
}
