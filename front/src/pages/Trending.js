/* page contenant le fil d'actualité des articles : accessible uniquement si connecté */
import React from 'react';
import HeaderLog from '../components/HeaderLog';
import Articles from '../components/Articles/Articles';


const Trending = () => {
    return (
        <>
            <div className="thread-page">
                <HeaderLog />
                <div className="thread-articles">
                    <Articles />
                </div>
            </div>
        </>
    );
};

export default Trending;