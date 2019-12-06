import React from 'react';
import ReactDOM from 'react-dom'
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

declare type MenuProps = VerticalMenu | HorizontalMenu;

export const Menu: React.FC<MenuProps> = ({ 
  children, 
  anchorRef,
  position = 'bottom', 
  alignment = position === 'top' || position === 'bottom' ? 'left' : 'top' 
}) => {

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const preventDefault = (e: MouseEvent) => {
    e.preventDefault()
  } 

  const toggleMenu = React.useCallback(() => {
      setIsOpen(!isOpen)
  }, [isOpen]);

  React.useEffect(() => {
    const anchorElement = anchorRef.current;
    anchorElement.addEventListener('click', toggleMenu);
    anchorElement.addEventListener('mousedown', preventDefault);

    return () => {
      anchorElement.removeEventListener('click', toggleMenu);
      anchorElement.removeEventListener('mousedown', preventDefault);
    };
  }, [anchorRef, toggleMenu])

  return isOpen || true
    ? ReactDOM.createPortal(
        <MenuContainer 
          anchorRef={anchorRef} 
          position={position} 
          alignment={alignment} 
          close={toggleMenu}
        >
          {children}
        </MenuContainer>, anchorRef.current ? anchorRef.current.ownerDocument.body : document.body
      )
    : null
}

export default Menu;
