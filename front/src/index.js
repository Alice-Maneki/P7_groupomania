import React from 'react';
import { createRoot } from 'react-dom/client';
/* on importe le fichier App.js qui contient notre app */
import App from './App';
/* on importe le fichier de styles  */
import './styles/index.scss';


/* on lie le fichier à l'id 'root' présent dans index.jtml */
const root = createRoot(document.getElementById('root'));

root.render(
  <>
    <App />
  </> 
    
);


