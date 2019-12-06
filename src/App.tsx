import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Menu } from './Menu/Menu'
import { MenuItem } from './Menu/MenuItem'
import { MenuLink } from './Menu/MenuLink';
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

const App: React.FC = () => {
  const ref: any = React.useRef(null)
 
  return (
    <div className="App">
      {/* <my-component></my-component> */}
      <header className="App-header">
        {/* <img ref={ref} src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {/* <MenuContainer>*/}
          <Btn ref={ref}>button</Btn> 
          {/* <Menu anchorRef={ref}>
            <MenuItem onClick={(e) => {console.log('-e-', e); e.stopPropagation()}}>Menu item first</MenuItem>
            <MenuItem onClick={(e) => {console.log('-e-', e); e.stopPropagation()}}>Menu item second</MenuItem>
            <MenuItem onClick={(e) => {console.log('-e-', e); e.stopPropagation()}}>Menu item third</MenuItem>
          </Menu> */}
        {/* </MenuContainer> */}
      </header>
    </div>
  );
}


// export default App;

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
      // <div style={{height: '2000px'}}>
      <>
        <button style={{margin: 200}} onClick={() => alert('a')}>aaaaaa</button>
        {/* <div id='aaa' tabIndex={-1} style={this.btnContainerStyle}>
        </div> */}
        <Btn ref={this.anchorRef}>toggle menu</Btn>

        <Menu position="bottom" anchorRef={this.anchorRef}>
          <MenuLink reference="/">Menu item first</MenuLink>
          <MenuItem onClick={(e) => {console.log('-e-', e)}}>Menu item second</MenuItem>
          <MenuItem onClick={(e) => {console.log('-e-', e)}}>Menu item third</MenuItem>
        </Menu>
      </>
      // </div>
    );
  }
}

export default MenuExample;