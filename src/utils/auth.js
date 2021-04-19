import Cookies from 'js-cookie'
const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserToken() {
  return Cookies.get('userToken')
}

export function setUserToken(token) {
  return Cookies.set('userToken', token)
}

export function removeUserToken() {
  return Cookies.remove('userToken')
}


export function getUserName() {
  return Cookies.get('userName')
}

export function setUserName(name) {
  return Cookies.set('userName', name)
}

export function removeUserName() {
  return Cookies.remove('userName')
}
export function getUserUrl() {
  return localStorage.getItem("userMenu");
}

export function setUserUrl(data) {
  localStorage.setItem("userMenu", JSON.stringify(data));
}

export function removeUserUrl() {
  localStorage.clear("userMenu");
}