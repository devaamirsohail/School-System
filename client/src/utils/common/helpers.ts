import cookie from "js-cookie";

//set in cookie

export const setCookie = (key: string, value: any) => {
  cookie.set(key, value, {
    expires: 1
  });
};

//remove from cookie
export const removeCookie = (key: string) => {
  cookie.remove(key);
};

//get from cookie such as stored token
//useful when we need to make request to server with token
export const getCookie = (key: string) => {
  return cookie.get(key);
};

//set in localstorage
export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
//remove from localstorage
export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

//authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response: any, next: Function) => {
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  next();
};
//signout user
//remove info from cookie and localstorage
export const signout = () => {
  removeCookie("token");
  removeLocalStorage("user");
};

//access user from localstorage

export const isAuth = () => {
  const cookieCheck = getCookie("token");
  if (cookieCheck) {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } else {
      return false;
    }
  }
};

//Update user during profile update action
export const updateUser = (response: any, next: Function) => {
  let auth: any = JSON.parse(localStorage.getItem("user") || "{}");
  auth = response.data;
  localStorage.setItem("user", JSON.stringify(auth));
  next();
};
