/* page contenant le fil d'actualité des articles : accessible uniquement si connecté */
import React from 'react';
import Header from '../components/Header';
import Thread from '../components/Thread';

const Trending = () => {
    return (
        <>
            <div className="thread-page">
                <Header />
                <div className="thread-articles">
                    <Thread />
                </div>
            </div>
        </>
    );
};

export default Trending;