/* formulaire pour créer un nouvel article et le poster sur le fil d'actualité */
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { createArticle } from '../../actions/article.actions';


const NewArticle = () => {
    const [newArticle, setNewArticle] = useState({
        userId : '',
        message : '',
        imageUrl : ''
    });
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(createArticle(newArticle));
    }
   
    return (
        <>
            <div className="newArticle-container">
                <form action="" className="newArticle-form" onSubmit={handleSubmit}>
                    <textarea name="userId" value={newArticle.userId} onChange={(event) => setNewArticle({ userId: event.target.value })} />
                    <textarea name="message" value={newArticle.message} onChange={(event) => setNewArticle({ message: event.target.value })} />
                    <div className="newArticle-image" >

                    </div>
                    <button className='btn-submit' type='submit'>Publier</button>
                </form>
                
            </div>
        </>
       
    );
};

export default NewArticle;