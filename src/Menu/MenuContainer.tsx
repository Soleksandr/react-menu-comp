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
}

interface MenuContainerState {
  boundingAnchorRect?: ClientRect;
  boundingMenuContainerRect?: ClientRect;
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



export class MenuContainer extends React.Component<MenuContainerProps, MenuContainerState> {
  menuContainerRef: any

  constructor(props: MenuContainerProps) {
    super(props)

    this.menuContainerRef = React.createRef()
  }

  state: MenuContainerState = {
    boundingAnchorRect: undefined,
    boundingMenuContainerRect: undefined,
  }

  _calculateDefaultIndentation = (boundingAnchorRect: ClientRect, offset: number): Indention => {
    return {
      top: boundingAnchorRect.bottom + offset,
      left: boundingAnchorRect.left
    }
  }

  calculateIndentation = (boundingAnchorRect: ClientRect, boundingMenuContainerRect: ClientRect): Indention => {
    let indention: Indention;
    const offset = 3;

    switch (`${this.props.position}-${this.props.alignment}`) {
      case 'bottom-left':
        indention = this._calculateDefaultIndentation(boundingAnchorRect, offset);
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
        indention = this._calculateDefaultIndentation(boundingAnchorRect, offset);
    }

    return indention;
  }

  setBoundingAnchorRect = () => {
    this.setState({ boundingAnchorRect: this.props.anchorRef.current.getBoundingClientRect() })
  }

  componentDidMount () {
    const { anchorRef } = this.props;

    this.setState({ 
      boundingAnchorRect: anchorRef.current.getBoundingClientRect(),
      boundingMenuContainerRect: this.menuContainerRef.current.getBoundingClientRect(),
    })

    window.addEventListener('resize', this.setBoundingAnchorRect)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.setBoundingAnchorRect);
  }

  render () {
    const { boundingAnchorRect, boundingMenuContainerRect } = this.state;
    const { children, position } = this.props;

    const { top = 0, left = 0 } = boundingAnchorRect && boundingMenuContainerRect
      ? this.calculateIndentation(boundingAnchorRect, boundingMenuContainerRect) 
      : {}

    return (
      <MenuContainerStyled ref={this.menuContainerRef} top={top} left={left} position={position}>
        <UlStyled top={top} left={left} position={position}>
          {children}
        </UlStyled>
      </MenuContainerStyled>
    ) 
  }
}