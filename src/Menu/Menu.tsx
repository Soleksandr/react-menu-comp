import React from 'react';
import ReactDOM from 'react-dom';
import { Backdrop } from './Backdrop';
import { MenuContainer, HorizontalPosition, VerticalPosition, HorizontalAlignment, VerticalAlignment } from './MenuContainer';

interface HorizontalMenu {
  anchorRef: React.RefObject<any>;
  position?: HorizontalPosition;
  alignment?: HorizontalAlignment;
}

interface VerticalMenu {
  anchorRef: React.RefObject<any>;
  position?: VerticalPosition;
  alignment?: VerticalAlignment;
}

declare type MenuProps = VerticalMenu | HorizontalMenu

interface MenuState {
  isOpen: boolean;
}

export class Menu extends React.Component<MenuProps, MenuState> {
  state = {
    isOpen: false,
  }

  toggleMenu = () => {
    this.setState({ isOpen: !this.state.isOpen})
  }

  componentDidMount () { 
    this.props.anchorRef.current.addEventListener('click', this.toggleMenu);
  }

  componentWillUnmount () {
    this.props.anchorRef.current.removeEventListener('click', this.toggleMenu);
  }

  render () {
    const { isOpen } = this.state;
    const { 
      children, 
      anchorRef, 
      position = 'bottom', 
      alignment = position === 'top' || position === 'bottom' ? 'left' : 'top' 
    } = this.props;

    if (anchorRef.current) {
      anchorRef.current.ownerDocument.body.style.overflow = isOpen ? 'hidden' : null
    }
    
    return isOpen
      ? ReactDOM.createPortal(
          <Backdrop onClick={this.toggleMenu}>
            <MenuContainer anchorRef={anchorRef} position={position} alignment={alignment}>
              {children}
            </MenuContainer>
          </Backdrop>,
          anchorRef.current.ownerDocument.body
        )
      : null
  }
}

export default Menu;