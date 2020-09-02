import React from 'react';

import styles from './AnswerItem.module.css';

const answerItem = (props) => (
  <button className={styles.AnswerItem}>
    <img src={props.imgSrc} alt={props.imgAlt} />
  </button>
);

export default answerItem;
