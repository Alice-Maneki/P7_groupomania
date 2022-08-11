/* formulaire de connexion : doit vérifier que l'identifiant est bien présent dans la BDD */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = ({ onLogin }) => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [login, setLogin] = useState(false);

  

  const navigate = useNavigate();

  const sendData = (event) => {
    const emailError = document.querySelector(".emailError");
    const passwordError = document.querySelector(".passwordError");

    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      withCredentials: true,
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    };

    fetch(`${process.env.REACT_APP_API_URL}api/auth/login`, requestOptions)
      .then((res) => {
        res.json().then((result) => {
          console.warn("result", result);
          
          localStorage.setItem('login', JSON.stringify({
            token: result.token           
          }));

          localStorage.setItem('userId', JSON.stringify({
            userId: result.userId
          }));

          if(result.error === 'Password unknown'){
            passwordError.innerHTML = "Mot de passe inconnu !!";
          }
          if (result.error === 'User unknown'){
            emailError.innerHTML = "Utilisateur inconnu !!";
          }
          if (res.status === 200 || login){
            navigate("/trending");
            alert("Vous étes connecté !");
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.token}`;
            setLogin(true)
          }
          
            
          })
        }) 
      
      .catch((error) => console.log(error));
  };

  return (
    <>
      <form onSubmit={sendData} className="signin-form">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          id="email"
          placeholder="Adresse email"
          value={emailValue}
          required
          onChange={(event) => setEmailValue(event.target.value)}
        />
        <div className="emailError"></div>

        <label htmlFor="password">Mot de Passe</label>
        <input
          name="password"
          type="password"
          id="password"
          placeholder="Mot de Passe"
          value={passwordValue}
          required
          onChange={(event) => setPasswordValue(event.target.value)}
        />
        <div className="passwordError"></div>

        <button type="submit">Se connecter</button>
      </form>
    </>
  );
};

export default Signin;
