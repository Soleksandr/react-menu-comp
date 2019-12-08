import React from 'react';

interface IMenuItemProps {

}

export const MenuItem: React.FC<IMenuItemProps> = ({ children }) => {
  return (
    <li style={{ padding: 3}}>{children}</li>
  );
}; 