import React from 'react';
// import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

export declare type Position =  'bottom' | 'top' | 'left' | 'right';
export declare type Alignment =  'left' | 'center' | 'right';

interface Indention {
  top: number;
  left: number;
}

interface MenuContainerProps {
  anchorRef: React.RefObject<any>;
  position?: Position;
  alignment?: Alignment;
}

interface MenuContainerState {
  boundingAnchorRect?: ClientRect;
  boundingMenuContainerRect?: ClientRect;
}

const backdropZIndex = 999;

interface MenuContainerStyledProps {
  top: number;
  left: number;
}

const MenuContainerStyled = styled.div<MenuContainerStyledProps>(props => ({
  position: 'absolute',
  top: props.top,
  left: props.left ,
  zIndex: backdropZIndex + 1,
  cursor: 'pointer',
  color: 'white',
  padding: '10px',
  border: '1px solid white'
}))



export class MenuContainer extends React.Component<MenuContainerProps, MenuContainerState> {
  refs: any

  state: MenuContainerState = {
    boundingAnchorRect: undefined,
    boundingMenuContainerRect: undefined,
  }

  _calculateDefaultIndentation = (boundingAnchorRect: ClientRect): Indention => {
    return {
      top: boundingAnchorRect.bottom,
      left: boundingAnchorRect.left
    }
  }

  calculateIndentation = (boundingAnchorRect: ClientRect, boundingMenuContainerRect: ClientRect): Indention => {
    let indention: Indention;

    switch (`${this.props.position}-${this.props.alignment}`) {
      case 'bottom-left':
        indention = this._calculateDefaultIndentation(boundingAnchorRect);
        break;

      case 'bottom-center':
        indention = {
          top: boundingAnchorRect.bottom,
          left: boundingAnchorRect.left - boundingMenuContainerRect.width / 2 + boundingAnchorRect.width / 2
        }
        break;
    
      default:
        indention = this._calculateDefaultIndentation(boundingAnchorRect);
    }

    return indention;
  }

  setBoundingAnchorRect = () => {
    this.setState({ boundingAnchorRect: this.props.anchorRef.current.getBoundingClientRect() })
  }

  componentDidMount () {
    const { anchorRef } = this.props;
    console.log('=== ref in didMount === ', this.refs)
    this.setState({ 
      boundingAnchorRect: anchorRef.current.getBoundingClientRect(),
      boundingMenuContainerRect: this.refs.menuContainerStyled.getBoundingClientRect(),
    })

    window.addEventListener('resize', this.setBoundingAnchorRect)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.setBoundingAnchorRect);
  }

  render () {
    const { boundingAnchorRect, boundingMenuContainerRect } = this.state;
    const { children, anchorRef } = this.props;

    const { top = 0, left = 0 } = boundingAnchorRect && boundingMenuContainerRect
      ? this.calculateIndentation(boundingAnchorRect, boundingMenuContainerRect) 
      : {}

    console.log('- menu -', boundingMenuContainerRect)
    console.log('- anchor -', boundingAnchorRect)
    console.log('- clientWidth -', anchorRef.current.ownerDocument.body.clientWidth)
    console.log('- clientHeight -', anchorRef.current.ownerDocument.body.clientHeight)


    return (
      <MenuContainerStyled ref="menuContainerStyled" top={top} left={left}>
        {children}
      </MenuContainerStyled>
    ) 
  }
}