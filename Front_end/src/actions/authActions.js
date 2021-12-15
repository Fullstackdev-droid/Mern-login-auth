import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
    SET_CURRENT_USER,
} from "./types";
import keys from "./config";
const url = keys.baseUrl;
console.log("ddsadsadsadsadsadsadsa",url);


// Admin signup
export const signUp = async (data) => {
  console.log("datadata",data);
  try {
      let respData = await axios({
          'method': 'post',
          'url': `${url}user/signUp`,
          data
      });
      console.log("respData.datarespData.datarespData.data",respData.data);
      return {
          loading: false,
          data:respData.data.message
      }
  }
  catch (err) {
      return {
          loading: false,
          error:  err.response.data
      }
  }
}

export const activateuser = async (data) => {
  try {
      let respData = await axios({
          'method': 'post',
          'url': `${url}user/activateuser`,   
          'headers': {
              'Authorization': localStorage.user_token
          },        
          data: data
      });
      return {
          loading: false,
          data:respData.data.message
      }
  }
  catch (err) {
      return {
          loading: false,
          error:  err.response.data
      }
  }
}

// Admin login
export const login = async (data) => {
  try {
      let respData = await axios({
          'method': 'post',
          'url': `${url}user/login`,
          data
      });
      localStorage.setItem('token', respData.data.token);

      return {
          loading: false,
          result: respData.data.result,
          message: respData.data.message,
      }

  }
  catch (err) {
      console.log(err)
      return {
          loading: false,
          error:  err.response.data
      }
  }
}


export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

console.log("dasdasdasdasd");
export const logoutUser = (history) => {
  removeAuthToken()
  history.push('/Login')
}


export const removeAuthToken = () => {
  console.log("dasdasdasdas8888888888888888888");
  localStorage.removeItem('token');
}