import React, { Component } from 'react';
import AnswerItem from '../components/AnswerItem';

import styles from './Question.module.css';

class Question extends Component {

  state = {
    isComplete: false,
    isAnsweredCorrect: null,
    selectedAnswer: null,
    correctAnswerIndex: null,
    correctAnswerName: null
  }

  componentDidMount() {
    const correctAnswerIndex = (
      Math.floor(Math.random() * this.props.questionData.length)
    );

    const correctAnswerName = (
      this.props.questionData[correctAnswerIndex].firstName + " " + this.props.questionData[correctAnswerIndex].lastName
    );

    this.setState({
      correctAnswerIndex: correctAnswerIndex,
      correctAnswerName: correctAnswerName
    });
  }

  imageClickedHandler = (tar) => {
    const isCorrect = (tar === this.state.correctAnswerIndex);

    this.setState({
      isComplete: true,
      isAnsweredCorrect: isCorrect,
      selectedAnswer: tar
    });

    this.props.setReady(true);

    if (isCorrect) {
      console.log("ding");
      //this.props.addScore();
    }
  }

  render() {

    const choices = (
      this.props.questionData.map((item, index) => {
        return(
          <AnswerItem
            key={item.id}
            imgSrc={item.headshot.url}
            imgAlt={item.headshot.alt}
            clicked={() => this.imageClickedHandler(index)}
            isDisabled={this.state.isComplete}
            isCorrectAnswer={this.state.isComplete && index === this.state.correctAnswerIndex}
            isChosenAnswer={this.state.selectedAnswer === index} />
        );
      })
    );

    return (
      <div className={styles.Question} hidden={this.props.isHidden}>
        <p className={styles.Text}>Which one of these good looking photos is the real</p>
        <p className={styles.Name}>{this.state.correctAnswerName}</p>
        <div className={styles.Container}>
          {choices}
        </div>
      </div>
    );
  }
}

export default Question;
