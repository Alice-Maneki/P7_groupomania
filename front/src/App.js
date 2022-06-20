import React, { useEffect, useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UidContext } from './components/AppContext';
import axios from 'axios';

import Home from "./pages/Home";
import Trending from "./pages/Trending";

/* UidContexte : permet d'avoir à chaque fois l'id utilisateur qq soit l'endroit où on se trouve sur l'app */
const App = () => {
  const [uid, setUid] = useState(null);

  useEffect( () => {
    const fetchToken = async() => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}`,
        withCredentials: true
      })
      .then((res) => { setUid(res.data) })
      .catch((err) => console.log('No Token'));
    };
    fetchToken();
  }, [uid]);

  return (
    <UidContext.Provider value={uid} >
      
    {/* on importe les components qui vont composer l'app */}
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/trending' element={<Trending />} />
      </Routes> 
    </Router>  
    </UidContext.Provider>  
  
  );
};

export default App;
