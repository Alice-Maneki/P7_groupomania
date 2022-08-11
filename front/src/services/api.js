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
        return axios.get(BASEURL + "api/auth/user/" + id);
    }
    
    getArticles() {
        return axios.get(BASEURL + "api/article/");
    }

    getArticleById(id){
        return axios.get(BASEURL + "api/article/" + id);
    }

    postArticle(){
        return axios.post(BASEURL + "api/articke/");
    }

    modifyArticle(id){
        return axios.put(BASEURL + "api/article/" + id);
    }

    deleteArticle(id){
        return axios.delete(BASEURL + "api/article/" + id);
    }

    likeArticle(id){
        return axios.post(BASEURL + "api/article/" + id + "/like");
    }
    
    postComment(id){
        return axios.patch(BASEURL + "api/article/comment/" + id);
    }

    modifyComment(id){
        return axios.patch(BASEURL + "api/article/comment/" + id);
    }

    deleteComment(id){
        return axios.patch(BASEURL + "api/article/comment/" + id);
    }
}



export default new Api();