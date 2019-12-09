import React from 'react';
import styled from '@emotion/styled';
import { zIndex } from './Backdrop';

export declare type HorizontalPosition = 'left' | 'right';
export declare type VerticalPosition = 'bottom' | 'top';
export declare type VerticalAlignment = HorizontalPosition | 'center'
export declare type HorizontalAlignment = VerticalPosition | 'center'

declare type Position = HorizontalPosition | VerticalPosition;
declare type Alignment = HorizontalAlignment | VerticalAlignment;

interface Indention {
  top: number;
  left: number;
}

interface MenuContainerProps {
  anchorRef: React.RefObject<any>;
  position: Position;
  alignment: Alignment;
  close: (e: MouseEvent) => any;
}

const pickBoxShadow = (position: Position) => {
  const sharedPart = '6px rgba(0,0,0,0.2)'
  const sharedEdgePart = '1px rgba(0,0,0,0.03)'

  let shadow;

  switch (position) {
    case 'bottom':
      shadow = `0 2px ${sharedPart} , 0 -1px ${sharedEdgePart}`
      break;
  
    case 'top':
      shadow = `0 -2px ${sharedPart}, 0 1px ${sharedEdgePart}`
      break;
  
    case 'left':
      shadow = `-2px 0 ${sharedPart}, 1px 0 ${sharedEdgePart}`
      break;
  
    case 'right':
      shadow = `2px 0 ${sharedPart}, -1px 0 ${sharedEdgePart}`
      break;
  
    default:
      shadow = `0 0 ${sharedPart}`
  }

  return shadow
}

const getOffset = (position: Position, isTopLeftCalculated: boolean) => {
  const offset = 10

  let top = 0;
  let left = 0;

  if (isTopLeftCalculated) {
    return { top, left }
  }

  switch (position) {
    case "top":
      top = -offset
      break;

    case "bottom":
      top = offset
      break;
  
    case "left":
      left = -offset
      break;

    case "right":
      left = offset
      break;
  }

  return { top, left }
}

const MenuContainerStyled = styled.div<Indention & { position: Position}>(props => ({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: props.top,
  left: props.left ,
  zIndex: zIndex + 1,
}))

const UlStyled = styled.ul<Indention & { position: Position}>(({ top, left , position}) => ({
  position: 'relative',
  margin: 0,
  padding: 0,
  zIndex: zIndex + 1,
  cursor: 'pointer',
  borderRadius: '5px',
  backgroundColor: '#FFFFFF',
  boxShadow: pickBoxShadow(position),
  transition: 'top .225s ease-in-out, left .225s ease-in-out',
  ...getOffset(position, Boolean(top && left))
}))

export const MenuContainer: React.FC<MenuContainerProps> = ({ children, anchorRef, position, alignment, close }) => {
  let menuContainerRef: any;
  menuContainerRef =  React.useRef();

  const [boundingAnchorRect, changeBoundingAnchorRect] = React.useState()
  const [boundingMenuContainerRect, changeBoundingMenuContainerRect] = React.useState()

  const _calculateDefaultIndentation = (boundingAnchorRect: ClientRect, offset: number): Indention => {
    return {
      top: boundingAnchorRect.bottom + offset + window.scrollY,
      left: boundingAnchorRect.left + window.scrollX
    }
  }

  const calculateIndentation = (boundingAnchorRect: ClientRect, boundingMenuContainerRect: ClientRect): Indention => {
    let indention: Indention;
    const offset = 3;

    switch (`${position}-${alignment}`) {
      case 'bottom-left':
        indention = _calculateDefaultIndentation(boundingAnchorRect, offset);
        break;

      case 'bottom-center':
        indention = {
          top: boundingAnchorRect.bottom + window.scrollY + offset,
          left: boundingAnchorRect.left - boundingMenuContainerRect.width / 2 + boundingAnchorRect.width / 2  + window.scrollX
        }
        break;

      case 'bottom-right':
        indention = {
          top: boundingAnchorRect.bottom + offset + window.scrollY ,
          left: boundingAnchorRect.right - boundingMenuContainerRect.width + window.scrollX
        }
        break;
      
      case 'top-left':
        indention = {
          top: boundingAnchorRect.top - boundingMenuContainerRect.height - offset  + window.scrollY,
          left: boundingAnchorRect.left  + window.scrollX
        }
        break;

      case 'top-center':
        indention = {
          top: boundingAnchorRect.top - boundingMenuContainerRect.height - offset + window.scrollY,
          left: boundingAnchorRect.left - boundingMenuContainerRect.width / 2 + boundingAnchorRect.width / 2  + window.scrollX
        }
        break;

      case 'top-right':
        indention = {
          top: boundingAnchorRect.top - boundingMenuContainerRect.height - offset + window.scrollY,
          left: boundingAnchorRect.right - boundingMenuContainerRect.width  + window.scrollX
        }
        break;
      
      case 'left-top':
        indention = {
          top: boundingAnchorRect.top + window.scrollY,
          left: boundingAnchorRect.left - boundingMenuContainerRect.width - offset  + window.scrollX
        }
        break;

      case 'left-center':
        indention = {
          top: boundingAnchorRect.top - boundingMenuContainerRect.height / 2 + boundingAnchorRect.height / 2 + window.scrollY,
          left: boundingAnchorRect.left - boundingMenuContainerRect.width - offset  + window.scrollX
        }
        break;

      case 'left-bottom':
        indention = {
          top: boundingAnchorRect.bottom - boundingMenuContainerRect.height + window.scrollY,
          left: boundingAnchorRect.left - boundingMenuContainerRect.width - offset  + window.scrollX
        }
        break;
      
      case 'right-top':
        indention = {
          top: boundingAnchorRect.top + window.scrollY,
          left: boundingAnchorRect.right + offset + window.scrollX
        }
        break;

      case 'right-center':
        indention = {
          top: boundingAnchorRect.top - boundingMenuContainerRect.height / 2 + boundingAnchorRect.height / 2 + window.scrollY,
          left: boundingAnchorRect.right + offset  + window.scrollX
        }
        break;

      case 'right-bottom':
        indention = {
          top: boundingAnchorRect.bottom - boundingMenuContainerRect.height + window.scrollY,
          left: boundingAnchorRect.right + offset  + window.scrollX
        }
        break;
    
      default:
        indention = _calculateDefaultIndentation(boundingAnchorRect, offset);
    }

    return indention;
  }

  const setBoundingAnchorRect = React.useCallback(() => {
    changeBoundingAnchorRect(anchorRef.current.getBoundingClientRect())
  }, [anchorRef])

  let timeoutIndex: any = React.useRef()
  
  const closeMenu = React.useCallback((e: any) => {
    console.log('-- loose focus --')
    timeoutIndex.current = setTimeout(() => close(e));
  }, [close, timeoutIndex])

  

  const focusMenuItem = React.useCallback((e:any) => {
    console.log('--')
    if (e.keyCode === 40 || e.keyCode === 38) {
      const listItemsArray = menuContainerRef.current.getElementsByTagName('ul')[0].children
      const focusAbleList = Array.from(listItemsArray).map((li: any) => li.firstChild)
      const activeIndex = focusAbleList.findIndex((el: any) => el === document.activeElement)

      if (activeIndex === -1) {
        focusAbleList[0].focus()
      } else if (e.keyCode === 40 && activeIndex !== focusAbleList.length - 1) {
        focusAbleList[activeIndex + 1].focus()
      } else if (e.keyCode === 38 && activeIndex) {
        focusAbleList[activeIndex - 1].focus()
      }

      clearTimeout(timeoutIndex.current)
    }
  }, [menuContainerRef, timeoutIndex])

  React.useEffect(() => {
    const anchorElement = anchorRef.current;
    const menuContainerElement =  menuContainerRef.current;
    console.log('use effect')
    changeBoundingAnchorRect(anchorElement.getBoundingClientRect());
    changeBoundingMenuContainerRect(menuContainerElement.getBoundingClientRect())

    window.addEventListener('resize', setBoundingAnchorRect);

    // menuContainerElement.focus()
    anchorElement.addEventListener('keydown', focusMenuItem)
    menuContainerElement.addEventListener('focusout', closeMenu)
    menuContainerElement.addEventListener('keydown', focusMenuItem)

    return () => {
      window.removeEventListener('resize', setBoundingAnchorRect)

      anchorElement.removeEventListener('keydown', focusMenuItem)
      menuContainerElement.removeEventListener('focusout', closeMenu)
      menuContainerElement.removeEventListener('keydown', focusMenuItem)
    }
  }, [anchorRef, menuContainerRef, setBoundingAnchorRect, focusMenuItem, closeMenu])

  const { top = 0, left = 0 } = boundingAnchorRect && boundingMenuContainerRect
    ? calculateIndentation(boundingAnchorRect, boundingMenuContainerRect) 
    : {}

  return (
    <MenuContainerStyled ref={menuContainerRef} top={top} left={left} position={position} tabIndex={-1}>
      <UlStyled 
        top={top} 
        left={left} 
        position={position} 
      >
        {
          React.Children.map(children, (child) => {
            return React.isValidElement(child) 
              ? React.cloneElement(
                  child, 
                  { onClick: (e: MouseEvent) => { child.props.onClick(e); close(e) } }
                )
              : child
          })
        }
      </UlStyled>
    </MenuContainerStyled>
  ) 
}
