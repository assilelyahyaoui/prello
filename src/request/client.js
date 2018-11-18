// Modules
import axios from 'axios';

// config
import { API_HOST, TIMEOUT} from '../config.json';

// https://github.com/axios/axios#creating-an-instance

// Singleton
const client = axios.create({
  baseURL: API_HOST,
  timeout: TIMEOUT,
  maxRedirects:1,
})

// https://github.com/axios/axios#creating-an-instance
/**
 * @desc Set the authorization header to Json Web Token protocol
 * @type {Function} synchronous
 * @param {String} token, "bearer xxxx" Json Web Token
 * @return self
 */
client.setJWT = (token) => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return client;
}

/**
 * @desc Get the Json Web Token
 * @type {Function} synchronous
 * @return Json Web Token or undefined
 */
client.getJWT = (token) => {
  const bearerToken = client.defaults.headers.common['Authorization'];
  return bearerToken && bearerToken.replace(/Bearer /, "");
}


/**
 * @desc remove the authentification to Json Web Token protocol
 * @type {Function} synchronous
 * @return self
 */
client.removeJWT = () => {
  client.defaults.headers.common['Authorization'] = null;
  return client;
}

/**
 * 
 */
client.setCredentials = (credentials) => {
  localStorage && localStorage.setItem("prello", JSON.stringify(credentials));
  client.me = credentials.idUser;
  client.credentials = credentials;
  client.setJWT(credentials.accessToken);
  return client;
}

client.getCredentials = () => {
  return client.credentials;
}

client.removeCredentials = () => {
  localStorage && localStorage.removeItem("prello");
  client.credentials = null;
  client.me = null;
  client.removeJWT();
  return client;
}

let creds = localStorage && JSON.parse(localStorage.getItem("prello"));
console.log(creds)
creds && client.setCredentials(creds);


export default client;