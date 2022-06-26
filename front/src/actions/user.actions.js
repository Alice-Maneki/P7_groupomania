import axios from 'axios';

/* permet de récupérer les données utilisateurs et de les placer dans le store pour pvr les utiliser n'importe où dans l'app */
export const GET_USER = "GET_USER";

export const getUser = (uid) => {
    return(dispatchEvent) => {
        return axios   
            .get(`${process.env.REACT_APP_API_URL}api/auth/user`)
            .then((res) => {
                dispatchEvent({ type: GET_USER, payload: res.data})
            })
            .catch((err) => console.log(err))
    }
}