import React, { Component } from 'react';

class Results extends Component {
  render() {
    return (
      <div>
        <h2>RESULTS</h2>
        <p>You scored {this.props.score} out of {this.props.scoreMax}</p>
      </div>
    );
  }
}

export default Results;
