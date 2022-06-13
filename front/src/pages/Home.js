import React from 'react';
import Signin from '../components/Signin';
import Signup from '../components/Signup';


const Home = () => {
    return (
        <>
            <div className="home-page">
                <div className="home-signup">
                    <Signup />
                </div>
                <div className="home-signin">
                    <Signin />
                </div>
            </div>
        </>
    );
};

export default Home;