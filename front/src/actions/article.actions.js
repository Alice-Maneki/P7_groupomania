/* action pour récupérer les articles de la BDD et les incrémenter 
toutes les actions qui ont un rapport avec les articles/commentaires */
import axios from 'axios';

/* ------------------ articles -------------------- */
export const GET_ARTICLES = "GET_ARTICLES";

/* pour récupérer les articles de la BDD et les placer dans le store */
export const getArticles = () => {
    return(dispatchEvent) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/article/`)
            .then((res) => {
                dispatchEvent({type: GET_ARTICLES, payload: res.data})
            })
            .catch((err) => console.log(err))
    }
}




/* --------------- commentaires ---------------------- */