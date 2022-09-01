import React, { useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthContext from './services/authContext';

import Home from "./pages/Home";
import Trending from "./pages/Trending";


/* UidContexte : permet d'avoir à chaque fois l'id utilisateur qq soit l'endroit où on se trouve sur l'app */
const App = (user) => {

  const [auth, setAuth] = useState(false);
 

  return (
   <>
    {/* on importe les components qui vont composer l'app */}
    <Router>
      <AuthContext.Provider value={{
        isLoggedIn: auth,
        setLoggedIn:(value) => {
          setAuth(value);
        }
      }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/trending' element={<Trending />} />
      </Routes> 
      </AuthContext.Provider>
    </Router>  
   </>   
     
  
  );
};

export default App;
