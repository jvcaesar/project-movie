import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom"
import MyMovies from './MyMovies'

const App = () => {
  return (
      <Router>
          <Routes>
              <Route exact path='/' element={<MyMovies />} />
              <Route path='*' element={<Navigate replace to='/' />} />
          </Routes>
      </Router>
  )
}

export default App