import React from 'react';
import { NavLink } from 'react-router-dom'
import styles from './ButtonLink.module.css';

const buttonLink = props => (
  <NavLink
    className={styles.Button}
    to={props.navTo}>
    {props.children}
  </NavLink>
);

export default buttonLink;
