"use server";


import pb from "@/utils/my_pb"
import { cookies } from "next/headers"


export async function getVoters(){
    try {
     const cookieStore = cookies()
     const authCookie = cookieStore.get('pb_auth')
     pb.client.authStore.loadFromCookie(authCookie?.value as any)
     const res = await pb.client.collection('voters').getFullList()
     return res
    } catch (error) {
     console.log(error)
     return []
    }
 }
 
 