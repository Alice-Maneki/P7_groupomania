import { fetchApi } from "./api";
import Cookies from 'js-cookie';

import { userLogout } from './toasts.user';


export function isLogged() {
    const loggedIn = Cookies.get("groupomania");
    if (loggedIn === "true") {
      return true;
    } else {
      return false;
    }
  }

export function getIdFromCookie() {
    const groupomaniaId = Cookies.get("groupomaniaId");
    if (groupomaniaId) {
      return groupomaniaId;
    } else {
      return false;
    }
  }
  
export function logout(page) {
    Cookies.remove("groupomania");
    Cookies.remove("groupomaniaId");
  
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    console.log(requestOptions);
    return fetchApi("/auth/logout", page, requestOptions)
      .then((response) => {
        console.log(response.json());
        if (response.ok) {
          userLogout();
        }
      })
      .catch((error) => console.log(error));
  }

export const getAccount = (accountId, page) => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    return fetchApi(`/auth/user/${accountId}`, page, requestOptions);
  };

export const deleteAccount = (accountId, page) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
  
    return fetchApi(`auth/user/${accountId}`, page, requestOptions)
      
  };
  
  