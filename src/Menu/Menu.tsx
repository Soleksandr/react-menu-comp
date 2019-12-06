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
      anchorRef.current.parentElement.focus();
      setIsOpen(!isOpen)
  }, [isOpen, anchorRef]);

  const closeMenuIfOpen = React.useCallback(() => {
    setIsOpen(false)
  }, [])


  React.useEffect(() => {
    const anchorElement = anchorRef.current;

    anchorElement.addEventListener('click', toggleMenu);
    anchorElement.addEventListener('mousedown', preventDefault);
    anchorElement.parentElement.addEventListener('blur', closeMenuIfOpen)

    return () => {
      anchorElement.removeEventListener('click', toggleMenu);
      anchorElement.removeEventListener('mousedown', preventDefault);
      anchorElement.parentElement.removeEventListener('blur', closeMenuIfOpen)
    };
  }, [anchorRef, toggleMenu, closeMenuIfOpen])

  if (anchorRef.current) {
    anchorRef.current.ownerDocument.body.style.overflow = isOpen ? 'hidden' : null
  }

  return isOpen
          ? ReactDOM.createPortal(
          <MenuContainer anchorRef={anchorRef} position={position} alignment={alignment}>
              {children}
            </MenuContainer>, anchorRef.current.parentElement
          )
          : null
}
export default Menu;
