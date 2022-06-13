import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import Log from "./components/Log";
import Header from "./components/Header";



const App = () => {
  
  return (
    <>
      <div className="App">
        {/* on importe les components qui vont composer l'app */}
       <Header />
       <Log />
        
      </div>
    </>
  );
};

export default App;
