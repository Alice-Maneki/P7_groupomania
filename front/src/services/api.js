import axios from "axios";

const BASEURL = `${process.env.REACT_APP_API_URL}`;

export const fetchApi = (path, page, requestOptions) => {
    if(page) {
        const result = fetch( axios.BASEURL + path + "?" + new URLSearchParams({ page }),
        requestOptions);
        return result;
    } else {
        const result = fetch( axios.BASEURL + path, requestOptions);
        return result;
    }
}

const storeToken = "Bearer" + JSON.parse(localStorage.getItem('login'));

const authAxios = axios.create({
    baseURL: BASEURL,
    headers: {
        'Authorization': `${storeToken}`
    }

})

class Api {
    
    getArticles() {
        return authAxios.get(BASEURL + "api/article/");
    }

    getArticleById(id){
        return authAxios.get(BASEURL + "api/article/" + id);
    }

    /* operations du crud */
}



export default new Api();