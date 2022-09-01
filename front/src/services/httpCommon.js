import axios from "axios";

export default axios.create({
    BASEURL: `${process.env.REACT_APP_API_URL}`,
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        'Authorization' : 'Bearer' + JSON.parse(localStorage.getItem("login"))
    }
    
   
})