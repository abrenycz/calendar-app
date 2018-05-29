import * as React from "react";
import './App.css';
import {HashRouter, NavLink, Route} from "react-router-dom";

import Monthview from "./Monthview";
import Weekview from "./Weekview";   

const sample_entries = {
  4 : { 
    15 : {
        'count': 1,
        'texts': ['1 example entry']
      }
    }, 
}
 
class App extends React.Component {
  constructor(props:any){
    super(props);

    if(!localStorage.getItem('entries'))
      localStorage.setItem('entries', JSON.stringify(sample_entries));
  }

  public render() {
    return (
      <HashRouter>
        <div>
          <div className="menu">
            <NavLink to="/">Month</NavLink>
            <span> | </span>  
            <NavLink exact to="/weekview">Week</NavLink>
          </div>
          <div className="content">
            <Route exact path="/" component={Monthview}/>
            <Route exact path="/weekview" component={Weekview}/>
          </div>
        </div> 
      </HashRouter>
    );
  }
}
 
export default App;