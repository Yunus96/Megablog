import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client()
    account;



    constructor(){
        
        this.client
            .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
            .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
            .setSession(conf.appWriteSession);

        this.account = new Account(this.client);
    }
    

    async createAccount({email, password, name}){
        console.log(this.account)
        try {
            const userAccount = await this.account.create( 
                ID.unique(), email, password, name)
                if (userAccount){
                    // call another method
                    return this.login({email, password})
                } else {
                    return userAccount;
                }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession
            (email, password)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            console.log(this.account)
           return await this.account.get()
        } catch (error) {
            throw error
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService();

export default authService;