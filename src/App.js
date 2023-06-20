import './App.css';
import React, {useState} from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

const App = (props) => {
  const pageSize = 5;
  const apiKey = "93d6eb5bc8574e64895cea3663f7ae10";
  const [progress, setProgress] = useState(0);
    return (
      <div>
        <BrowserRouter>
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
       <NavBar/>
       <Switch>
        <Route exact path="/"><News setProgress = {setProgress} apiKey={apiKey} pageSize={pageSize} key ="general" country ='in' category='general'/></Route>
        <Route exact path="/Business"><News setProgress = {setProgress} apiKey={apiKey} pageSize={pageSize} key ="Business" country ='in' category='Business'/></Route>
        <Route exact path="/Entertainment"><News setProgress = {setProgress} apiKey={apiKey} pageSize={pageSize} key ="Entertainment" country ='in' category='Entertainment'/></Route>
        <Route exact path="/General"><News setProgress = {setProgress} apiKey={apiKey} pageSize={pageSize} key ="General" country ='in' category='General'/></Route>
        <Route exact path="/Health"><News setProgress = {setProgress} apiKey={apiKey} pageSize={pageSize} key ="Health" country ='in' category='Health'/></Route>
        <Route exact path="/Science"><News setProgress = {setProgress} apiKey={apiKey} pageSize={pageSize} key ="Science" country ='in' category='Science'/></Route>
        <Route exact path="/Sports"><News setProgress = {setProgress} apiKey={apiKey} pageSize={pageSize} key ="Sports" country ='in' category='Sports'/></Route>
        <Route exact path="/Technology"><News setProgress = {setProgress} apiKey={apiKey} pageSize={pageSize} key ="Technology" country ='in' category='Technology'/></Route>
        </Switch>
       </BrowserRouter>
      </div>
    )
}
export default App;

 
