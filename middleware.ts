// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';
import pocketBaseClient from "@/utils/pocket-base-client";
import {getNextjsCookie} from "@/utils/cookie-utils";
import pb from "@/utils/my_pb";
export async function middleware(req: NextRequest) {
    const { pathname, origin } = req.nextUrl;
    // List of protected routes
    const publicRoutes = ['/', '/admin/login', '/api/admin/login', '/voter/permit', '/voter/vote', '/results'];

    const response = NextResponse.next();
    const isLoggedIn = await pb.isAuthenticated(req.cookies as any);
    const isVoterLoggedIn = await pb.isVoterAuthenticated(req.cookies as any);

    // if (req.nextUrl.pathname && req.nextUrl.pathname.startsWith("/voter")) {
    //     if (!isVoterLoggedIn) {
    //         return NextResponse.redirect(new URL("/voter/permit", req.url));
    //     }else {
    //         if (req.nextUrl.pathname && req.nextUrl.pathname.match("/voter/permit")) {
    //             console.log("======================================",await pb.getVoterUser(req.cookies))

    //             const user = await pb.getVoterUser(req.cookies)
    //             return NextResponse.redirect(new URL(`/voter/${user?.id}/vote`, req.url));
    //         }
    //     }
    // }

    // if (req.nextUrl.pathname && req.nextUrl.pathname.startsWith("/admin/login")) {
    //     if (isLoggedIn) {
    //         return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    //     }
    //     return;
    // }
    // if (!publicRoutes.includes(pathname)) {
    //     if (!isLoggedIn) {
    //         const url = req.nextUrl.clone()
    //         url.pathname = '/admin/login';
    //         return NextResponse.redirect(url);
    //     }
    // }

    // If the user is authenticated or the route is not protected, continue to the requested resource
    return NextResponse.next();
}

export const config = {
    matcher:  ['/((?!api|_next/static|_next/image|favicon.ico).*)'],

};