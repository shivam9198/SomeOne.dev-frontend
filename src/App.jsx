import React from 'react'
import Body from './components/Body'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Profile from './components/Profile'
import Login from './components/Login'
import { Provider } from 'react-redux'
import appStore from './utils/AppStore'
import Feed from './components/Feed'
import Connection from './components/Connection'
import Request from './components/Request'

function App() {
  return (
    <Provider store = {appStore}>
    <BrowserRouter basename='/'>
    <Routes>
      <Route path="/" element={<Body />}>  {/*this route is the parent route which is body*/}
      <Route path = "/" element = {<Feed/>}/>        {/*this route is the child route */}
      <Route path ='/login' element={<Login/>}/>        {/*this route is the child route */}
      <Route path ='/profile' element={<Profile/>}/>      {/*this route is the child route */}
      <Route path ='/request' element={<Request/>}/>      {/*this route is the child route */}
      <Route path ='/connections' element={<Connection/>}/>      {/*this route is the child route */}
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>

  )
}

export default App