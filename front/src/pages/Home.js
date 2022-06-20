import React, { useContext } from 'react';
import { UidContext } from '../components/AppContext';
import Log from '../components/Log';
import Header from '../components/Header';

const Home = () => {
    const uid = useContext(UidContext);

    return (
        <>
        { uid ? (
            <h1> Update Page</h1>
        ) : ( 
            <div className="home-page">
                <Header />
                <Log /> 
                
            </div>
        )}
            
        </>
    );
};

export default Home;