import React, { useState } from "react";
import axios from "axios";
import Signin from "./Signin";

const Signup = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const signUpErrors = (err) => {
    let errors = {email: "", password: "" };
    const emailError = document.querySelector(".emailError");
    const passwordError = document.querySelector(".password.error");

    if (err.data.includes("email")) emailError.innerHTML = "Email incorrect";
  
    if (err.data.includes("Password"))
      passwordError.innerHTML = "Le mot de passe doit faire 6 caractères minimum";
  
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
      errors.email = "Cet email est déjà enregistré";
  
    return errors;
  };

  
  const handleRegister = async (event) => {
    event.preventDefault();

    const emailError = document.querySelector(".emailError");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".passwordConfirm.error"
    );
    const terms = document.getElementById("terms");
    const termsError = document.querySelector(".terms.error");

    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";

    
    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML = "Mots de passe non identiques";
      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
        data: {
          name,
          firstName,
          email,
          password,
        },
      })
        .then((res) => {
          if (res.data.errors) {
          
            emailError.innerHTML = res.data.errors;
            passwordError.innerHTML = res.data.errors;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <Signin />
          <span className="success"> Enregistrement réussi, veuillez vous connecter !</span>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} className="signup-form">
          <label htmlFor="name">Nom</label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            onChange={(event) => setName(event.target.value)}
            value={name}
            placeholder='DUPONT'
            required
          />
          <div className="name error">{signUpErrors}</div>
          <br />

          <label htmlFor="firstName">Prénom</label>
          <br />
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={(event) => setFirstName(event.target.value)}
            value={firstName}
            placeholder='Luc'
            required
          />
          <div className="firstName error">{signUpErrors}</div>
          <br />

          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            placeholder='dupontluc@gmail.com'
            required
          />
          <div className="email error">{signUpErrors}</div>
          <br />

          <label htmlFor="password">Mot de Passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            required
          />
          <div className="password error"></div>
          <br />

          <label htmlFor="password-conf">Confirmer mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password-conf"
            onChange={(event) => setControlPassword(event.target.value)}
            value={controlPassword}
            required
          />
          <div className="passwordConfirm error"></div>
          <br />
          <div className="checkbox-form">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              J'accepte les
              <a href="/" target="_blank" rel="noopener noreferrer">
                conditions générales
              </a>
            </label>
            <div className="terms error"></div>
          </div>
          <br />
          <input type="submit" value="Inscription" />
        </form>
      )}
    </>
  );
};

export default Signup;
