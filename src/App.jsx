import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Difficulty from './pages/Difficulty'
import Landing from './pages/Landing'
import MinMax from './pages/MinMax'
import RandomMove from './pages/RandomMove'

const App = () => {
  return (
    <BrowserRouter>

      <Routes>
        {/* default */}
        <Route path='/' element={<Landing />} />

        <Route path='/difficulty' element={<Difficulty />} />

        <Route path='/minmax' element={<MinMax />} />

        <Route path='/random_move' element={<RandomMove />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App