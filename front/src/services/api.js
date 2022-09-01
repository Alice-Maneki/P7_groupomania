import axios from "axios";



const BASEURL = `${process.env.REACT_APP_API_URL}`;



class Api {
    
    getUsers() {
        return axios.get(BASEURL + "api/auth/user");
    }

    getUserById(id) {
        return axios.get(BASEURL + "api/auth/user/" + id);
    }
    
    getArticles() {
        return axios.get(BASEURL + "api/article/");
    }

    getArticleById(id){
        return axios.get(BASEURL + "api/article/" + id);
    }

    newArticle(data){
        return axios.post(BASEURL + "api/article/", data);
    }

    modifyArticle(id, data){
        return axios.put(BASEURL + "api/article/" + id, data);
    }

    deleteArticle(id){
        return axios.delete(BASEURL + "api/article/" + id);
    }

    likeArticle(id, data){
        return axios.patch(BASEURL + "api/article/" + id + "/like", data);
    }


    newComment(id, data){
        return axios.patch(BASEURL + "api/article/comment/" + id, data);
    }

    modifyComment(id, data){
        return axios.patch(BASEURL + "api/article/comment/" + id, data);
    }

    deleteComment(id){
        return axios.patch(BASEURL + "api/article/comment/" + id);
    }
}


export default new Api();
