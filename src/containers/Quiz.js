import React, { Component } from 'react';
import axios from 'axios';

import Question from './Question';
import Results from './Results';
import Button from '../components/ui/Button';

//import '../global.css';
import styles from './Quiz.module.css';

const NUMBER_OF_QUESTIONS = 5;
const NUMBER_OF_CHOICES = 6;

class Quiz extends Component {

  state = {
    isLoaded: false,
    error: null,
    progress: 0,
    score: 0,
    isLocked: false,
    isComplete: false,
    items: [],
    quizData: [],
    correctAnswer: null,
    selectedAnswer: null,
    isAnsweredCorrect: null
  };

  componentDidMount() {
    axios.get("https://willowtreeapps.com/api/v1.0/profiles")
      .then(response => {
        // Generate a new correct answer
        const newCorrectAnswer = this.pickNewAnswer();
        this.setState({
          isLoaded: true,
          items: response.data,
          correctAnswer: newCorrectAnswer
        });
        // Create data for quiz and set in state
        this.setQuestionDataState();
      })
      .catch(error => {
        this.setState({
          isLoaded: true,
          error: true
        })
      });
  }

  setQuestionDataState = () => {
    const range = this.state.items.length;
    const quizData = [];
    let reservedItems = this.createReservedItems(range);

    for (let i = 0; i < NUMBER_OF_QUESTIONS; i++) {
      quizData.push(this.createQuestionData(this.state.items, reservedItems, i));
    }

    this.setState({
      quizData: quizData
    });
  }

  createReservedItems = (range) => {
    const totalPull = NUMBER_OF_CHOICES * NUMBER_OF_QUESTIONS;
    let pool = new Set();
    let rtn = [];

    while (pool.size < totalPull) {
      pool.add(Math.floor(Math.random() * range));
    }

    pool.forEach(item => {
      rtn.push(item);
    });

    return rtn;
  }

  createQuestionData = (data, reservedItems, offset) => {
    let rtn = [];

    for (let i = offset; i < (NUMBER_OF_CHOICES * NUMBER_OF_QUESTIONS); i += NUMBER_OF_QUESTIONS) {
      rtn.push(data[reservedItems[i]]);
    }

    return rtn;
  }

  pickNewAnswer = () => {
    return Math.floor(Math.random() * NUMBER_OF_CHOICES);
  }

  continueClickedHandler = () => {
    const prevProgress = this.state.progress;
    const newProgress = prevProgress + 1;
    const newCorrectAnswer = this.pickNewAnswer()

    this.setState({
      progress: newProgress,
      isLocked: false,
      correctAnswer: newCorrectAnswer,
      selectedAnswer: null,
      isAnsweredCorrect: null
    });

    if (this.state.progress >= NUMBER_OF_QUESTIONS - 1) {
      this.setState({
        isComplete: true
      })
    }
  }

  setFrozenStatusHandler = (val) => {
    this.setState({
      isLocked: val
    })
  }

  setSelectedHandler = (ans) => {
    this.setState ({
      selectedAnswer: ans,
      isAnsweredCorrect: (this.state.correctAnswer === this.state.selectedAnswer)
    });
  }

  addScoreHandler = () => {
    const prevScore = this.state.score;
    const newScore = prevScore + 1;

    this.setState({
      score: newScore
    });
  }

  render() {
    const { error, isLoaded, isComplete } = this.state;
    let quizDisplay = null;
    let continueButton = null;

    if (error) {
      quizDisplay = (
        <React.Fragment>
          <h2>Uh oh...</h2>
          <p>Something went wrong while loading the quiz.</p>
        </React.Fragment>
      );
    } else if (!isLoaded) {
      quizDisplay = <div className="loader">Loading...</div>;
    } else if (isComplete) {
      quizDisplay = (
        <Results
          score={this.state.score}
          scoreMax={NUMBER_OF_QUESTIONS} />
      );
    } else {

      quizDisplay = (
        this.state.quizData.map((questionData, index) => {
          return (
            <Question
              key={Math.floor(Math.random() * 10000000)}
              isHidden={index !== this.state.progress}
              questionData={questionData}
              choiceCount={NUMBER_OF_CHOICES}
              correctAnswer={this.state.correctAnswer}
              selectedAnswer={this.state.selectedAnswer}
              isFrozen={this.state.isLocked}
              isCorrect={(this.state.correctAnswer === this.state.selectedAnswer)}
              setSelected={this.setSelectedHandler}
              setFrozen={this.setFrozenStatusHandler}
              addScore={this.addScoreHandler}/>
          )
        })
      );

      continueButton = (
        <Button
          isDisabled={!this.state.isLocked}
          clicked={this.continueClickedHandler}>
          Continue
        </Button>
      );

    }

    return (
      <div className={styles.Quiz}>
        {quizDisplay}
        {continueButton}
      </div>
    );
  }
}

export default Quiz;
