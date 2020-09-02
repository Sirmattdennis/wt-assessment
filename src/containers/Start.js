import React, { Component } from 'react';

import ButtonLink from '../components/ui/ButtonLink';

import styles from './Start.module.css';
import '../global.css';

import logo from '../assets/title-home.svg';

class Start extends Component {
  render() {
    return (
      <div className={styles.Start}>
        <h1 className="sr-only">The Name Game!</h1>
        <img src={logo} alt="The Name Game!" />
        <p>Try matching the WillowTree employee to their photo.</p>
        <ButtonLink navTo="/play">Play!</ButtonLink>
      </div>
    );
  }
}

export default Start;
