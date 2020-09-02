import React, { Component } from 'react';
import axios from 'axios';

import Question from './Question';
import Results from './Results';
import Button from '../components/ui/Button';

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
    timer: 0,
    timestamp: null
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
        // Kick off quiz by setting the first timestamp
        this.setNewTimeStamp();
      })
      .catch(error => {
        this.setState({
          isLoaded: true,
          error: true
        })
      });
  }

  // Call in functions below to assemble an array of quiz data to set to state.
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

  // Create array of numbers to use as in-bound indexes to pull from main items array.
  // Use set and while loop to ensure zero repeat items throughout quiz.
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

  // Create and return array of objects of a number of questions
  // and choices per question matching Question/Choice amoung constants
  createQuestionData = (data, reservedItems, offset) => {
    let rtn = [];

    for (let i = offset; i < (NUMBER_OF_CHOICES * NUMBER_OF_QUESTIONS); i += NUMBER_OF_QUESTIONS) {
      rtn.push(data[reservedItems[i]]);
    }

    return rtn;
  }

  // Generate and return a random number to use to determine correct answer
  pickNewAnswer = () => {
    return Math.floor(Math.random() * NUMBER_OF_CHOICES);
  }

  // Create a new timestamp
  setNewTimeStamp = () => {
    const timestamp = new Date();
    this.setState({
      timestamp: timestamp
    })
  }

  // Compare two timestamps and add the elapsed time in seconds to the state timer
  updateTimer = () => {
    const startTime = this.state.timestamp;
    const endTime = new Date();
    const timer = this.state.timer;
    const timerIncrease = ((endTime.getTime() - startTime.getTime()) / 1000).toFixed(2);
    const newTimer = (+timer + +timerIncrease).toFixed(2);
    this.setState({
      timer: newTimer
    })

  }

  // State updates to progress to next question
  continueClickedHandler = () => {
    const prevProgress = this.state.progress;
    const newProgress = prevProgress + 1;
    const newCorrectAnswer = this.pickNewAnswer()

    this.setState({
      progress: newProgress,
      isLocked: false,
      correctAnswer: newCorrectAnswer,
      selectedAnswer: null
    });

    // If already at last question, set flag to proceed to results
    if (this.state.progress >= NUMBER_OF_QUESTIONS - 1) {
      this.setState({
        isComplete: true
      })
    } else {
      this.setNewTimeStamp();
    }
  }

  // Set isLocked in state and update timer in state
  setLockedStatusHandler = (val) => {
    this.updateTimer();

    this.setState({
      isLocked: val
    })
  }

  // Set selectedAnswer in state
  setSelectedHandler = (ans) => {
    this.setState ({
      selectedAnswer: ans
    });
  }

  // Increment score in state
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
          scoreMax={NUMBER_OF_QUESTIONS}
          averageTime={(this.state.timer / NUMBER_OF_QUESTIONS).toFixed(2)} />
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
              setFrozen={this.setLockedStatusHandler}
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
