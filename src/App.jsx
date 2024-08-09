import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth.service.js"
import { login, logout } from "./store/authSlice.js"
import { Outlet } from 'react-router-dom'
import {Header, Footer} from "./components/index.js" 

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData) => {
      console.log(userData)
      if(userData){
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <h1>hello</h1>
         Todo :<Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
