import React from 'react';
import ReactDOM from 'react-dom';
import { Backdrop } from './Backdrop';
import { MenuContainer, Position, Alignment } from './MenuContainer';

interface MenuProps {
  anchorRef: React.RefObject<any>;
  position?: Position;
  alignment?: Alignment;
}

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
    const { children, anchorRef, position = 'bottom', alignment = 'left' } = this.props;

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