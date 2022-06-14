import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    const nameError = document.querySelector(".name.error");
    const firstNameError = document.querySelector(".firstName.error");
    const emailError = document.querySelector(".emailError");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(".passwordConfirm.error");
    const terms = document.getElementById("terms");
    const termsError = document.querySelector(".terms.error");
    
    passwordConfirmError.innerHTML="";
    termsError.innerHTML="";

    if (password !== controlPassword || !terms.checked){
        if( password !== controlPassword)
        passwordConfirmError.innerHTML = "Mots de passe non identiques";
        if(!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales";
    } else {
        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
            data: {
                name,
                firstName,
                email,
                password
            }
        })
        .then((res) => {
            if(res.data.errors){
                nameError.innerHTML = "Non accepté";
                firstNameError.innerHTML = "Non accepté";
                emailError.innerHTML = "Email non valide";
                passwordError.innerHTML = "Mot de passe invalide";
             }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <form action="" onSubmit={handleRegister} className="signup-form">
      <label htmlFor="name">Nom</label>
      <br />
      <input
        type="text"
        name="name"
        id="name"
        onChange={(event) => setName(event.target.value)}
        value={name}
      />
      <div className="name error"></div>
      <br />

      <label htmlFor="firstName">Prénom</label>
      <br />
      <input
        type="text"
        name="firstName"
        id="firstName"
        onChange={(event) => setFirstName(event.target.value)}
        value={firstName}
      />
      <div className="firstName error"></div>
      <br />

      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
      />
      <div className="email error"></div>
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

      <label htmlFor="password-conf">Confirmer mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password-conf"
        onChange={(event) => setControlPassword(event.target.value)}
        value={controlPassword}
      />
      <div className="passwordConfirm error"></div>
      <br />
      <div className="checkbox-form">
        <input type="checkbox" id="terms"/>
        <label htmlFor="terms">J'accepte les 
            <a href="/" target="_blank" rel="noopener noreferrer">conditions générales</a>
        </label>
        <div className="terms error"></div>
      </div>
      <br />
      <input type="submit" value="Inscription" />
    </form>
  );
};

export default Signup;
