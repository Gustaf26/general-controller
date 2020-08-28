import "./animation-styles.css";
import React, {useState} from 'react';
import {NavLink, Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import {Fade} from 'reactstrap'
import Mainapp from './Mainapp';
import Textinput from './textinput'
import Films from './films'
import './App.css';

const App = (props) => {

  const [fadeIn, setFadeIn] = useState(true);


    return (
    <BrowserRouter>
    
        <Route exact path="/">
          <Redirect to="/mainapp" />
        </Route> 

        <div>
          <header className="jumbotron">

              <p id="title">Stardust controller</p>
          
          </header>

          <Switch>
              <Route path="/textinput" children={<Textinput/>} />
              <Route path="/films" children={<Films/>} />
              <Fade in={fadeIn} unmountOnExit={true}>
                  <Route path="/mainapp" children={<Mainapp/>} />
              </Fade>
          </Switch>
        
        </div>

        <footer>
            <p>Photo by Jon Tyson on Unsplash</p>
        </footer>
    </BrowserRouter>)
}

export default App;
