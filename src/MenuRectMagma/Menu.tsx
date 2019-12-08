import React from 'react';

interface IMenuProps {

}

export const Menu: React.FC = ({ children }) => {
  const [toggle, menuList] = React.Children.toArray(children);
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
  <div style={{ display: 'inline-block'}}>
    {
      React.isValidElement(toggle) && React.cloneElement(toggle, { onClick: toggleMenu })
    }
    {
      isOpen && React.isValidElement(menuList) && React.cloneElement(menuList, { isOpen })
    }
  </div>
  );
};
