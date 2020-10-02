import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from "./App";
import * as serviceWorker from './serviceWorker';
import Project from './components/Project';
import ThankYou from './components/ThankYou';
import Results from './components/Results';
import Spring2020 from './components/Spring2020';


ReactDOM.render(
  <Router>
        <Route exact path='/' component={App} />
        <Route exact path={`/:id(\\d+)`} 
        render={(props) => <Project {...props} />}/>
        <Route exact path='/thankyou' component={ThankYou} />
        <Route exact path='/results' component={Results} />
        <Route exact path='/spring2020' component={Spring2020} />



        {/* <Route path="/:id" render={(props) => <Project text="Hello, " {...props} />} /> */}
        {/* <Route 
          path='/'
          render={(props) => <App {...props} id={true} />}
/> */}
  </Router>,
  document.getElementById('root')
);

