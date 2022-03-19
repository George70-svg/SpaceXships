import './App.css'
import classes from './AppWrapper.module.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ShipsListWrapper from './components/ShipsListWrapper/ShipsListWrapper'
import ShipCardWrapper from './components/ShipCardWrapper/ShipCardWrapper'

const App = () => {
  return (
      <div className={classes.appWrapper}>
          <Routes>
              <Route exact path='/' element={<ShipsListWrapper/>}/>
              <Route path='/shipCard' element={<ShipCardWrapper/>}/>
          </Routes>
      </div>
  )
}

export default App
