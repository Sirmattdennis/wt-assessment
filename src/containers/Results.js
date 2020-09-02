import React from 'react';

import ButtonLink from '../components/ui/ButtonLink';

import styles from './Results.module.css';
import imgSquare from '../assets/square.svg';
import imgStar from '../assets/star.svg';
import imgTriangle from '../assets/triangle.svg';
import imgLilBub from '../assets/lil-bub.svg';


const results = (props) => (
  <div className={styles.Results}>
    <div className={styles.Top}>
      <div className={styles.IconContainer}>
        <div className={styles.IconContainerTop}>
          <img src={imgSquare} alt='square' />
          <img src={imgStar} alt='star' />
          <img src={imgTriangle} alt='triangle' />
        </div>
        <img src={imgLilBub} alt='happy face' />
      </div>
      <p>
        Congratulations,<br />
        you scored {props.score} / {props.scoreMax}!
      </p>
    </div>
    <div className={styles.ResultsButton}>
      <ButtonLink navTo="/">Return to Home</ButtonLink>
    </div>
    <div className={styles.Bottom}>
      <div className={styles.Stat}>
        <p>{((props.score / props.scoreMax) * 100).toFixed(0)}%</p>
        <p>Correct Selections</p>
      </div>
      <div className={styles.Stat}>
        <p>{(100 - (props.score / props.scoreMax) * 100).toFixed(0)}%</p>
        <p>Incorrect Selections</p>
      </div>
      <div className={styles.Stat}>
        <p>{props.averageTime}</p>
        <p>Avg Selection Time</p>
      </div>
    </div>
  </div>
)

export default results;
