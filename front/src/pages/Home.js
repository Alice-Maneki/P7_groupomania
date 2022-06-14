import React, { useContext } from 'react';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import { UidContext } from '../components/AppContext';

const Home = () => {
    const uid = useContext(UidContext);

    return (
        <>
        { uid ? (
            <h1> Update Page</h1>
        ) : ( 
            <div className="home-page">
                <div className="home-signup">
                    <Signup />
                </div>
                <div className="home-signin">
                    <Signin />
                </div>
            </div>
        )}
            
        </>
    );
};

export default Home;