import React from 'react'
import Body from './components/Body'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Profile from './components/Profile'
import Login from './components/Login'

function App() {
  return (
    <BrowserRouter basename='/'>
    <Routes>
      <Route path="/" element={<Body />}>  {/*this route is the parent route which is body*/}
      <Route path ='/login' element={<Login/>}/>        {/*this route is the child route */}
      <Route path ='/profile' element={<Profile/>}/>      {/*this route is the child route */}
      </Route>
    </Routes>
    </BrowserRouter>

  )
}

export default App