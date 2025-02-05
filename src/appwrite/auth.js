import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async createAccount({ email, password, username }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, username);
            if (userAccount) {
                // call antoher method
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("appwrite service :: createAccount :: error", error)
        }
    }
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("appwrite service :: login :: error", error);
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }
    async logout() {
        try {
            await this.account.deleteSession('current');
        } catch (error) {
            console.error("appwrite service :: logout :: error", error);
        }
    }
};

const authService = new AuthService();

export default authService;
