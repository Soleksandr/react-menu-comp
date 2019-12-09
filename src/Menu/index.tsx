import React from 'react';
// import { MenuListProps } from './MenuList'

export { MenuList } from './MenuList';
export { MenuItem } from './MenuItem';
export { ToggleButton } from './ToggleButton';

// interface IMenuProps {

// }

export const Menu: React.FC = ({ children }: any) => {
  const toggleButtonRef = React.useRef()

  const [isOpen, setIsOpen] = React.useState(false);
  const [toggle, menuList] = React.Children.toArray(children);

  const toggleMenu = () => {
    console.log('-- close --')
    setIsOpen(!isOpen)
  }

  return (
  <>
    {
      React.isValidElement(toggle) && React.cloneElement<any>(toggle, { onClick: toggleMenu, ref: toggleButtonRef })
    }
    {
      isOpen && React.isValidElement(menuList) && React.cloneElement<any>(menuList, { isOpen, toggleButtonRef, close: toggleMenu })
    }
  </>
  );
};
