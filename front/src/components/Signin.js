

import React, { useState } from "react";
import axios from "axios";
import Trending from "../pages/Trending";


const Signin = () => {
  const [formSubmit, setFormSubmit] = useState(false);

  const signInErrors = (err) => {
    let errors = { email: "", password: "" };

    if (err.message.includes("email")) errors.email = "Email inconnu";

    if (err.message.includes("password"))
      errors.password = "Le mot de passe ne correspond pas";

    return errors;
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/auth/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then(({ error }) => {
        if ({ error }) {
          emailError.innerHTML = "Email erroné";
          passwordError.innerHTML = "Mot de passe inconnu";
        } else {
          setFormSubmit(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {formSubmit ? (
        <Trending />
      ) : (
        <form action="" onSubmit={handleLogin} className="signin-form">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            placeholder="dupontluc@gmail.com"
            required
          />
          {/* balise pour stocker les erreurs */}
          <div className="email error">{signInErrors}</div>
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
            autocomplete="current-password"
            required
          />
          <div className="password error">{signInErrors}</div>
          <br />
          <input type="submit" value="Se Connecter" />
        </form>
      )}
    </>
  );
};

export default Signin;
