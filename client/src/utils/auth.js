<<<<<<< HEAD
import { jwtDecode } from "jwt-decode";

class AuthService {
	getProfile() {
		const token = this.getToken();
		return jwtDecode(token);
	}
=======
// Import everything under an alias
import * as jwtDecode from 'jwt-decode';

class AuthService {
  getProfile() {
    return jwtDecode.default(this.getToken());
  }
>>>>>>> 7cb3ee0cb40b5cfbcd55159ce81e57ec029435d6

  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

<<<<<<< HEAD
	isTokenExpired(token) {
		// Decode the token to get its expiration time that was set by the server
		const decoded = jwtDecode(token);
		// If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
		if (decoded.exp < Date.now() / 1000) {
			localStorage.removeItem("id_token");
			return true;
		}
		// If token hasn't passed its expiration time, return `false`
		return false;
	}
=======
  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = jwtDecode.default(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("id_token");
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }
>>>>>>> 7cb3ee0cb40b5cfbcd55159ce81e57ec029435d6

  getToken() {
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    localStorage.setItem("id_token", idToken);
    // window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.reload();
  }
}

export default new AuthService();
