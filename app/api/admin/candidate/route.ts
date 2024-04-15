import pb from "@/utils/my_pb";
import { cookies } from 'next/headers';
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
       
        const cookieStore = cookies()
        const authCookie = cookieStore.get('pb_auth')
         pb.client.authStore.loadFromCookie(authCookie?.value as any)
        const result =  await pb.client.collection('candidates').getFullList();
       console.log(result)

        return NextResponse.json(result);
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
