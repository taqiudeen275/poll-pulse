import pb from "@/utils/my_pb";
import { cookies } from 'next/headers';
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        console.log('form:', { email, password })
        const result = await pb.authenticate(email, password);
        const {admin, token} = result;
        admin.token = token;
        cookies().set('pb_auth', pb.client.authStore.exportToCookie());

        return NextResponse.json(admin);
    } catch (err: any) {
        return new Response(
            JSON.stringify({ error: err.message || err.toString() }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
    }
}