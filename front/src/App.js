import React, { useEffect, useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import Log from "./components/Log";
import Header from "./components/Header";
import { UidContext } from './components/AppContext';
import axios from 'axios';

const App = () => {
  const [uid, setUid] = useState(null);

  useEffect( () => {
    const fetchToken = async() => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}`,
        withCredentials: true
      })
      .then((res) => setUid(res.data))
      .catch((err) => console.log('No Token'));
    };
    fetchToken();
  }, []);

  return (
    <UidContext.Provider value={uid} >
        {/* on importe les components qui vont composer l'app */}
        <Header />

        <Log />
    </UidContext.Provider>  
  
  );
};

export default App;
