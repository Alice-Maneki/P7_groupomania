import React from "react";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from "./pages/Home";
import Trending from "./pages/Trending";


/* UidContexte : permet d'avoir à chaque fois l'id utilisateur qq soit l'endroit où on se trouve sur l'app */
const App = (user) => {

 

  return (
   <>
    {/* on importe les components qui vont composer l'app */}
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/trending' element={<Trending />} />
      </Routes> 
    </Router>  
   </>   
     
  
  );
};

export default App;
