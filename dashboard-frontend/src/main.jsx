
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'
import Home from './pages/Home.jsx'
import Show from './components/Show.jsx'


const router  = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<App />} >
      <Route path='/' element={<Home />} />
      <Route path='/show' element={<Show />} /> 
    </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>
  
)
