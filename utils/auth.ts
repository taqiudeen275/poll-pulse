// utils/auth.js
import pocketBaseClient from "@/utils/pocket-base-client";


export async function authenticateUser(email: string, password: string) {
    try {
        const authData = await pocketBaseClient.collection('users').authWithPassword(email, password);
        if (typeof window !== 'undefined') {
            localStorage.setItem('pb_auth', JSON.stringify(authData));
        }
        return authData;
    } catch (err) {
        // @ts-ignore
        throw new Error(err.message);
    }
}


export async function logoutUser(): Promise<void> {
    try {
        await pocketBaseClient.authStore.clear();
        document.cookie=pocketBaseClient.authStore.exportToCookie({ httpOnly: false });

    } catch (err) {
        // @ts-ignore
        throw new Error(err.message);
    }
}