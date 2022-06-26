/* formulaire de connexion : doit vérifier que l'identifiant est bien présent dans la BDD */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = ({ onLogin }) => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const navigate = useNavigate();

  const sendData = (event) => {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    };

    fetch(`${process.env.REACT_APP_API_URL}api/auth/login`, requestOptions)
      .then((res) => {
        if (res.status === 200) {
          navigate("/trending");
        }
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

        <button type="submit">Se connecter</button>
      </form>
    </>
  );
};

export default Signin;
