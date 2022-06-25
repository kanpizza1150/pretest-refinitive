import React, { FC } from 'react'
import Q1 from './q_1'
import { Routes, Route, Link } from 'react-router-dom'
import Q2 from './q_2'

const App: FC = () => {
  return (
    <>
      <nav>
        <Link to='/q1'>Question 1</Link>
        <Link to='/q2'>Question 2</Link>
      </nav>
      <Routes>
        <Route path='/q1' element={<Q1 />} />
        <Route path='/q2' element={<Q2 />} />
      </Routes>
    </>
  )
}

export default App
