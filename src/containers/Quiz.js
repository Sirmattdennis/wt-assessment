import React, { Component } from 'react';
import axios from 'axios';

//import '../global.css';

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
        console.log(response);
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

    /*fetch("https://willowtreeapps.com/api/v1.0/profiles")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result.items
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )*/
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
      quizDisplay = (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.firstName} {item.lastName}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <div>{ quizDisplay }</div>
    );
  }
}

export default Quiz;
