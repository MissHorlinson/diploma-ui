import axios from "axios";

export default class AuthService {

    static async login(creds) {
        const response = await axios.post('/auth/login', creds);
        return response;
    }

    static async logout() {
        await axios.post('/auth/logout');
    }
}