import Login from "./views/Login";
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom"
import './App.css';
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Signup from "./views/Signup";
import Game from "./views/Game"
import  AuthProvider  from "./contexts/AuthContext";
import UserProvider from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Profile from "./views/Profile";


function App() {
  

  return (
    <Router>
      <AuthProvider>
        <UserProvider>
        <NavBar></NavBar>
          <Routes>
           
           <Route element={<ProtectedRoute/>} >
              <Route path="/" element={<Home/>} ></Route>
              <Route path="/game" element={<Game/>} ></Route>
              <Route path="/profile" element={<Profile/>} ></Route>
            </Route> 


            <Route element={<PublicRoute/>} >
              <Route path="/login" element={<Login/>} ></Route>
         
              <Route Route path="/signup" element={<Signup/>} ></Route>
            
            </Route>
          
          
        

          </Routes>
          </UserProvider>
      </AuthProvider>
    </Router>
  );

  

}




export default App;
