import React, { Component } from 'react';
import AnswerItem from '../components/AnswerItem';

import styles from './Question.module.css';

class Question extends Component {

  // Check if answer is correct and run appropriate quiz handlers
  imageClickedHandler = (tar) => {
    const isCorrect = (tar === this.props.correctAnswer);

    this.props.setFrozen(true);
    this.props.setSelected(tar);

    if (isCorrect) {
      this.props.addScore();
    }
  }

  render() {

    // Create answer name because I can
    const answerName = (
      this.props.questionData[this.props.correctAnswer].firstName + ' ' + this.props.questionData[this.props.correctAnswer].lastName
    )

    // Populate question with available answer items
    const choices = (
      this.props.questionData.map((item, index) => {
        return(
          <AnswerItem
            key={item.id}
            imgSrc={item.headshot.url}
            imgAlt={item.headshot.alt}
            clicked={() => this.imageClickedHandler(index)}
            isDisabled={this.props.isFrozen}
            isCorrectAnswer={this.props.isFrozen && this.props.selectedAnswer === this.props.correctAnswer}
            isChosenAnswer={this.props.selectedAnswer === index} />
        );
      })
    );

    return (
      <div className={styles.Question} hidden={this.props.isHidden}>
        <p className={styles.Text}>Which one of these good looking photos is the real</p>
        <p className={styles.Name}>{answerName}</p>
        <div className={styles.Container}>
          {choices}
        </div>
      </div>
    );
  }
}

export default Question;
