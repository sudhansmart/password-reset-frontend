import { useState } from 'react'
import './App.css'
import{BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import ForgotPassword from './components/ForgotPassword'
import HomePage from './components/HomePage'
import PasswordChangePage from './components/PasswordChangePage'



function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <>
    <Router>  
        <Routes>
          <Route  path='/' element={<Login setToken={setToken}/>} />
          <Route  path='/signup' element={<SignUp/>} />  
          <Route  path='/forgot' element={<ForgotPassword/>} />
          <Route  path='/resetpassword/:token' element={<PasswordChangePage/>} />
          <Route
          path="/home"
          element={token ? <HomePage/> : <Navigate to="/" />}
        />

        </Routes>

    </Router>
  
     
    </>
  )
}

export default App
