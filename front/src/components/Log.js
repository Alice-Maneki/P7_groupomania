import React, { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';

const Log = () => {
    const[signUpModal, setSignUpModal] = useState(true);
    const[signInModal, setSignInModal] = useState(false);

    const handleModals = (element) => {
        if(element.target.id === "register"){
            setSignInModal(false);
            setSignUpModal(true);
        } else if(element.target.id === "login") {
            setSignUpModal(false);
            setSignInModal(true);
        }
    }

    return (
        <div className="log-form">
            <div className="form-container">
                <ul>
                    <li 
                        onClick={handleModals} 
                        id="register" 
                        className={signUpModal ? "active-btn" : null}
                        >S'inscrire
                    </li>
                    <li 
                        onClick={handleModals} 
                        id="login" 
                        className={signInModal ? "active-btn" : null}
                        >Se Connecter
                    </li>
                </ul>
                {signUpModal && <Signup />}
                {signInModal && <Signin />}                
            </div>
        </div>
        
    );
};

export default Log;