import React, { Component } from 'react';
import AnswerItem from '../components/AnswerItem';

import styles from './Question.module.css';

// const choices = (
//   this.props.choiceCount
// )
//
// const question = (props) => (
//   [...Array(this.props.choiceCount)].map((e, i) => (
//     <div>Hello</div>
//   )
// );

// const question = (props) => (
//   this.props.questionData.map((item, index) => {
//     return (
//       <AnswerItem
//         key={item.id}
//         imgSrc={item.headshot.url}
//         imgAlt={item.headshot.alt}
//         clicked={() => this.imageClickedHandler(index)}
//         isDisabled={this.props.isFrozen}
//         isCorrectAnswer={this.state.isComplete && index === this.state.correctAnswerIndex}
//         isChosenAnswer={this.state.selectedAnswer === index} />)
//   });
// );
//
// const correctAnswer = 3;

class Question extends Component {

  state = {
    isComplete: false,
    isAnsweredCorrect: null,
    selectedAnswer: null,
    correctAnswerIndex: Math.floor(Math.random() * this.props.questionData.length),
    correctAnswerName: null
  }

  componentDidMount() {
    // const correctAnswerIndex = (
    //   //Math.floor(Math.random() * this.props.questionData.length)
    //   //correctAnswer
    // );

    // const correctAnswerName = (
    //   this.props.questionData[this.props.correctAnswer].firstName + " " + this.props.questionData[this.props.correctAnswer].lastName
    // );
    //
    // this.setState({
    //   //correctAnswerIndex: correctAnswerIndex,
    //   correctAnswerName: correctAnswerName
    // });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isFrozen) return true;
      console.log("true");
    return true;
  }

  imageClickedHandler = (tar) => {
    const isCorrect = (tar === this.props.correctAnswer);

    this.setState({
      isComplete: true,
      isAnsweredCorrect: isCorrect,
      selectedAnswer: tar
    });

    this.props.setFrozen(true);

    if (isCorrect) {
      console.log("ding");
      this.props.addScore();
    }
  }

  render() {

    const answerName = (
      this.props.questionData[this.props.correctAnswer].firstName + ' ' + this.props.questionData[this.props.correctAnswer].lastName
      //"Jimmers"
    )

    const choices = (
      this.props.questionData.map((item, index) => {
        return(
          <AnswerItem
            key={item.id}
            imgSrc={item.headshot.url}
            imgAlt={item.headshot.alt}
            clicked={() => this.imageClickedHandler(index)}
            isDisabled={this.props.isFrozen}
            isCorrectAnswer={this.state.isComplete && index === this.props.correctAnswer}
            isChosenAnswer={this.state.selectedAnswer === index} />
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
