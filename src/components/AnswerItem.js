import React from 'react';

import styles from './AnswerItem.module.css';

const answerItem = (props) => (
  <button
    className={[styles.AnswerItem, (props.isCorrectAnswer && props.isChosenAnswer ? styles.Correct : null), (!props.isCorrectAnswer && props.isChosenAnswer ? styles.Incorrect : null)].join(' ')}
    onClick={props.clicked}
    disabled={props.isDisabled}>
    <img
      src={props.imgSrc}
      alt={props.imgAlt} />
  </button>
);

export default answerItem;
