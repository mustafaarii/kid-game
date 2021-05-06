import React, { Component } from 'react'
import {Switch,Route} from 'react-router-dom'
import Homepage from './components/Homepage'
import LevelOne from './components/LevelOne'
import LevelTwo from './components/LevelTwo'
import LevelTree from './components/LevelTree'
import LevelFour from './components/LevelFour'
import LevelFive from './components/LevelFive'
import LevelSix from './components/LevelSix'
export default class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Homepage}></Route>
        <Route exact path="/level_1" component={LevelOne}></Route>
        <Route exact path="/level_2" component={LevelTwo}></Route>
        <Route exact path="/level_3" component={LevelTree}></Route>
        <Route exact path="/level_4" component={LevelFour}></Route>
        <Route exact path="/level_5" component={LevelFive}></Route>
        <Route exact path="/level_6" component={LevelSix}></Route>
      </Switch>
       

      
    )
  }
}
