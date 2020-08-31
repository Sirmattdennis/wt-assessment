import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Start from './containers/Start';
import Quiz from './containers/Quiz';
import Results from './containers/Results';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/play" component={Quiz} />
        <Route path="/results" component={Results} />
        <Route path="/" exact component={Start} />
        <Route render={() => <h1>404 Not Found :(</h1>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
