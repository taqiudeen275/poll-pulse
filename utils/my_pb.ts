import PocketBase from 'pocketbase';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const POCKET_BASE_URL = "http://127.0.0.1:8090";

export class DatabaseClient {
    client: PocketBase;
    fileBaseURL: string;
    constructor () {
        this.client = new PocketBase(POCKET_BASE_URL);
        this.fileBaseURL = `${POCKET_BASE_URL}/api/files/hooimef6b6yqbd5/kyi0r8iz7av3koy/`
    }

    async authenticate (email: string, password: string) {
        try {
            const result = await this.client.admins.authWithPassword(email, password);
            // console.log('authenticate result:', result);
            if (!result?.token) {
                throw new Error("Invalid email or password");
            }
            return result;
        } catch (err) {
            console.error(err);
            throw new Error("Invalid email or password");
        }
    }


    async isAuthenticated(cookieStore: ReadonlyRequestCookies) {
        const cookie = cookieStore.get('pb_auth');
        if (!cookie) {
            return false;
        }

        this.client.authStore.loadFromCookie(cookie?.value || '');
        return this.client.authStore.isValid || false
    }

    async getUser(cookieStore: ReadonlyRequestCookies) {
        const cookie = cookieStore.get('pb_auth');
        if (!cookie) {
            return false;
        }

        this.client.authStore.loadFromCookie(cookie?.value || '');
        return this.client.authStore.model ;
    }
    async logoutUser(){
        try {
            await this.client.authStore.clear();
            document.cookie=this.client.authStore.exportToCookie({ httpOnly: false });

        } catch (err) {
            // @ts-ignore
            throw new Error(err.message);
        }
    }
}

export const pb = new DatabaseClient();

export default pb;