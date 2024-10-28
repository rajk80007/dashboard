import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
      

    </>
  )
}

export default App
