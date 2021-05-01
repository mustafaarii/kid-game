import React, { Component } from 'react'
import {Switch,Route} from 'react-router-dom'
import './style.css'
import Homepage from './components/Homepage'
import LevelOne from './components/LevelOne'
import LevelTwo from './components/LevelTwo'
export default class App extends Component {

  state={
    list:[{id:1,name:"Mustafa Arı"},{id:2,name:"Hüseyin Arı"},{id:3,name:"Tekin Ağacık"}]
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Homepage}></Route>
        <Route exact path="/level_1" component={LevelOne}></Route>
        <Route exaact path="/level_2" component={LevelTwo}></Route>
      </Switch>
       

      
    )
  }
}
