/* formulaire d'inscription : envoi les infos de l'utilisateur à la base de données */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signin from "./Signin";

const Signup = () => {
  const navigate = useNavigate();
  const [formSubmit, setFormSubmit] = useState(false);

  const [nameValue, setNameValue] = useState("");
  const [firstNameValue, setFirstNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const SendData = (event) => {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      body: JSON.stringify({
        name: nameValue,
        firstName: firstNameValue,
        email: emailValue,
        password: passwordValue,
      }),
    };
    fetch(`${process.env.REACT_APP_API_URL}api/auth/signup`, requestOptions)
      .then((res) => {
        if (res.ok) {
          navigate("/");
          setFormSubmit(true);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {formSubmit ? (
        <>
          <Signin />
          <span className="success">
            {" "}
            Enregistrement réussi, veuillez vous connecter !
          </span>
        </>
      ) : (
        <form onSubmit={SendData}>
          <div className="signup-form">
            <label htmlFor="nom">Nom</label>
            <input
              id="nom"
              name="nom"
              type="text"
              placeholder="Nom"
              value={nameValue}
              required
              pattern={"^([\\p{L}]+)([\\p{L}\\- ']*)$"}
              onChange={(event) => setNameValue(event.target.value)}
            />

            <label htmlFor="prenom">Prénom</label>
            <input
              id="prenom"
              name="prenom"
              type="text"
              placeholder="Prénom"
              value={firstNameValue}
              required
              pattern={"^([\\p{L}]+)([\\p{L}\\- ']*)$"}
              onChange={(event) => setFirstNameValue(event.target.value)}
            />

            <label htmlFor="email">Adresse email</label>
            <input
              id="email"
              name="email"
              type="email"
              aria-describedby="emailHelp"
              placeholder="Adresse email"
              value={emailValue}
              required
              onChange={(event) => setEmailValue(event.target.value)}
            />

            <label htmlFor="password">Mot de Passe</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Mot de Passe"
              value={passwordValue}
              required
              pattern={"^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{4,}$"}
              onChange={(event) => setPasswordValue(event.target.value)}
            />
            <div className="form-password">5 caractères minimum et comprend au moins une majuscule et un chiffre !</div>
            <button type="submit">S'inscrire</button>
          </div>
        </form>
      )}
    </>
  );
};

export default Signup;
