import React, { Component } from 'react';
import AnswerItem from '../components/AnswerItem';

import styles from './Question.module.css';

class Question extends Component {

  buttonClickedHandler = () => {
    console.log("click'd");
  }

  render() {

    const correctAnswer = Math.floor(Math.random() * this.props.questionData.length);

    const choices = (
      this.props.questionData.map(item => {
        return(
          <AnswerItem
            key={item.id}
            imgSrc={item.headshot.url}
            imgAlt={item.headshot.alt} />
        );
      })
    );

    return (
      <div className={styles.Question}>
        <p className={styles.Text}>Which one of these good looking photos is the real</p>
        <p className={styles.Name}>{this.props.questionData[correctAnswer].firstName} {this.props.questionData[correctAnswer].lastName}</p>
        <div className={styles.Container}>
          {choices}
        </div>
      </div>
    )
  }
}

export default Question;
