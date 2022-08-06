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

   

class Api {
    /* operations du crud */
    getUsers() {
        return axios.get(BASEURL + "api/auth/user");
    }

    getUsersId(id) {
        return axios.get(BASEURL + "api/auth/user" + id);
    }
    
    getArticles() {
        return axios.get(BASEURL + "api/article/");
    }

    getArticleById(id){
        return axios.get(BASEURL + "api/article/" + id);
    }

    
}



export default new Api();