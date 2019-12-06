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
  top: props.top,
  left: props.left ,
  zIndex: zIndex + 1,
  ':focus': {
    outline: 'none'
  }
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
      top: boundingAnchorRect.bottom + offset,
      left: boundingAnchorRect.left
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
          top: boundingAnchorRect.bottom + offset,
          left: boundingAnchorRect.left - boundingMenuContainerRect.width / 2 + boundingAnchorRect.width / 2
        }
        break;

      case 'bottom-right':
        indention = {
          top: boundingAnchorRect.bottom + offset,
          left: boundingAnchorRect.right - boundingMenuContainerRect.width
        }
        break;
      
      case 'top-left':
        indention = {
          top: boundingAnchorRect.top - boundingMenuContainerRect.height - offset,
          left: boundingAnchorRect.left
        }
        break;

      case 'top-center':
        indention = {
          top: boundingAnchorRect.top - boundingMenuContainerRect.height - offset,
          left: boundingAnchorRect.left - boundingMenuContainerRect.width / 2 + boundingAnchorRect.width / 2
        }
        break;

      case 'top-right':
        indention = {
          top: boundingAnchorRect.top - boundingMenuContainerRect.height - offset,
          left: boundingAnchorRect.right - boundingMenuContainerRect.width
        }
        break;
      
      case 'left-top':
        indention = {
          top: boundingAnchorRect.top,
          left: boundingAnchorRect.left - boundingMenuContainerRect.width - offset
        }
        break;

      case 'left-center':
        indention = {
          top: boundingAnchorRect.top - boundingMenuContainerRect.height / 2 + boundingAnchorRect.height / 2,
          left: boundingAnchorRect.left - boundingMenuContainerRect.width - offset
        }
        break;

      case 'left-bottom':
        indention = {
          top: boundingAnchorRect.bottom - boundingMenuContainerRect.height,
          left: boundingAnchorRect.left - boundingMenuContainerRect.width - offset
        }
        break;
      
      case 'right-top':
        indention = {
          top: boundingAnchorRect.top,
          left: boundingAnchorRect.right + offset
        }
        break;

      case 'right-center':
        indention = {
          top: boundingAnchorRect.top - boundingMenuContainerRect.height / 2 + boundingAnchorRect.height / 2,
          left: boundingAnchorRect.right + offset
        }
        break;

      case 'right-bottom':
        indention = {
          top: boundingAnchorRect.bottom - boundingMenuContainerRect.height,
          left: boundingAnchorRect.right + offset
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

  React.useEffect(() => {
    const anchorElement = anchorRef.current;
    changeBoundingAnchorRect(anchorElement.getBoundingClientRect());
    changeBoundingMenuContainerRect(menuContainerRef.current.getBoundingClientRect())

    window.addEventListener('resize', setBoundingAnchorRect);

    menuContainerRef.current.focus()
    menuContainerRef.current.addEventListener('focusout', close)

    return () => {
      window.removeEventListener('resize', setBoundingAnchorRect)
      menuContainerRef.current.removeEventListener('focusout', close)
    }
  }, [anchorRef, menuContainerRef, setBoundingAnchorRect])

  const { top = 0, left = 0 } = boundingAnchorRect && boundingMenuContainerRect
    ? calculateIndentation(boundingAnchorRect, boundingMenuContainerRect) 
    : {}

  return (
    <MenuContainerStyled ref={menuContainerRef} top={top} left={left} position={position} tabIndex={0}>
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
