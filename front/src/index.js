import React from 'react';
import ReactDOM from 'react-dom';
/* on importe le fichier App.js qui contient notre app */
import App from './App';
/* on importe le fichier de styles  */
import './styles/index.scss';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

ReactDOM.render(
  
    <App />,
    /* on lie le fichier à l'id 'root' présent dans index.jtml */
    document.getElementById('root')
);


