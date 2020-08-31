import React, { Component } from 'react';
import classes from '/Layout.css';

class Layout extends Component {
  state = {
    showNavbar: false
  }
}

render() {
  return (
    <React.Fragment>
      //TODO<NavBar></NavBar>
      <Game />
    </React.Fragment>
  );
}

export default Layout;
