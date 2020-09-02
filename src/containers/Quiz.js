import React, { Component } from 'react';
import axios from 'axios';

import Question from './Question';
import Button from '../components/ui/Button';

//import '../global.css';
import styles from './Quiz.module.css';

const NUMBER_OF_QUESTIONS = 5;
const NUMBER_OF_CHOICES = 6;

class Quiz extends Component {

  state = {
    progress: 0,
    score: 0,
    isLoaded: false,
    error: null,
    isReady: false,
    items: [],
    quizData: []
  };

  componentDidMount() {
    axios.get("https://willowtreeapps.com/api/v1.0/profiles")
      .then(response => {
        //console.log(response);
        this.setState({
          isLoaded: true,
          items: response.data
        });
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

  continueClickedHandler = () => {
    const prevProgress = this.state.progress;
    const newProgress = prevProgress + 1;

    this.setState({
      progress: newProgress,
      isReady: false
    });

    if (this.state.progress >= NUMBER_OF_QUESTIONS - 1) this.props.history.push('/results');
  }

  setReadyStatusHandler = (val) => {
    this.setState({
      isReady: val
    })
  }

  addScoreHandler = () => {
    const prevScore = this.state.score;
    const newScore = prevScore + 1;

    this.setState({
      score: newScore
    });
  }

  render() {
    const { error, isLoaded } = this.state;
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
    } else {

      //console.log(quizData);

      quizDisplay = (
        this.state.quizData.map((questionData, index) => {
          return (
            <Question
              key={Math.floor(Math.random() * 10000000)}
              isHidden={index !== this.state.progress}
              questionData={questionData}
              setReady={this.setReadyStatusHandler}
              addScore={this.addScoreHandler}/>
          );
        })
      );

      continueButton = (
        <Button
          isDisabled={!this.state.isReady}
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
