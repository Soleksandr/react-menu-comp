import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Menu } from './MenuRectMagma/Menu'
import { MenuItem } from './MenuRectMagma/MenuItem'
import { MenuLIst } from './MenuRectMagma/MenuList';
import { ToggleMenu } from './MenuRectMagma/ToggleMenu';
import './WebComponent';
import Button from '@material-ui/core/Button';

const Btn: React.FC<any> = React.forwardRef(({ children }, ref: any) => {
  // console.log('')
  return (
    <button
    onClick={() => console.log('----- click ------')} 
    ref={ref} 
    style={{ padding: '10px 15px'}}>
      {children}
    </button>
    )
})

class MenuExample extends React.Component {
  anchorRef: any;

  constructor (props: any) {
    super(props)

    this.anchorRef = React.createRef()
  }

  btnContainerStyle = {
    display: 'inline-block', 
    margin:'300px',
  }
  render () {
    return (
      <div style={{padding: '50px'}}>
      <Menu>
        <ToggleMenu standAloneButton>toggle</ToggleMenu>
        <MenuLIst>
          <MenuItem>this is the first item in menu</MenuItem>
          <MenuItem>one more item</MenuItem>
          <MenuItem>third</MenuItem>
          <MenuItem>and the last one</MenuItem>
        </MenuLIst>
      </Menu>
      <span>
        some other content
      </span>
      <a href="/">link</a>
      </div>
    );
  }
}

export default MenuExample;