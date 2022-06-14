import React, { useState } from "react";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    /* éviter que la page se recharge à chaque fois */
    event.preventDefault();
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');

    axios({
        method: "post",
        url:`${process.env.REACT_APP_API_URL}api/auth/login`,
        withCredentials: true,
        data: {
            email,
            password
        },
    })
        .then(({error}) => {
            if({error}){
                emailError.innerHTML = "Email erroné";
                passwordError.innerHTML = "Mot de passe inconnu";
            } else {
                window.location = "/";
            }
        })
        .catch((err) => {
            console.log(err);
        });
  };

  return (
    <form action="" onSubmit={handleLogin} className="signin-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
      />
      {/* balise pour stocker les erreurs */}
      <div className="email error"></div>
      {/* on utilise onChange pour stocker la valeur de l'input !! */}
      <br />
      
      <label htmlFor="password">Mot de Passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input type="submit" value="Se Connecter" />
    </form>
  );
};

export default Signin;
