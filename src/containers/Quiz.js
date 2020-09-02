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
    items: []
  };

  componentDidMount() {
    axios.get("https://willowtreeapps.com/api/v1.0/profiles")
      .then(response => {
        //console.log(response);
        this.setState({
          isLoaded: true,
          items: response.data
        });
      })
      .catch(error => {
        this.setState({
          isLoaded: true,
          error: true
        })
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

  render() {
    const { error, isLoaded, items } = this.state;
    let quizDisplay = null;

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
      const range = items.length;
      const quizData = [];
      let reservedItems = this.createReservedItems(range);

      for (let i = 0; i < NUMBER_OF_QUESTIONS; i++) {
        quizData.push(this.createQuestionData(items, reservedItems, i));
      }

      //console.log(quizData);

      quizDisplay = (
        quizData.map((questionData, index) => {
          return (
            <React.Fragment key={Math.floor(Math.random() * 10000000)}>
              <Question questionData={questionData} isActive={index === 0} />
              <Button isDisabled={true} clicked={this.buttonClickedHandler}>Continue</Button>
            </React.Fragment>
          );
        })
      );
    }

    return (
      <div className={styles.Quiz}>{quizDisplay}</div>
    );
  }
}

export default Quiz;
