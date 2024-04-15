"use server";     

import pb from "@/utils/my_pb";
import { cookies } from 'next/headers';
import { NextResponse } from "next/server";



export async function addCandidate(full_name: string, position: string, email: string) {
 try{

    const data = {
        "full_name": full_name,
        "email":email,
        "position": position,

    };

    const cookieStore = cookies()
    const authCookie = cookieStore.get('pb_auth')
     pb.client.authStore.loadFromCookie(authCookie?.value as any)
  const res = await pb.client.collection('candidates').create(data);
  return res;

 }catch(error){
    console.log(error)
    return "Error Occured"
 }
}

export async function getPositions(){
   try {
    const cookieStore = cookies()
    const authCookie = cookieStore.get('pb_auth')
    pb.client.authStore.loadFromCookie(authCookie?.value as any)
    const res = await pb.client.collection('positions').getFullList()
    return res
   } catch (error) {
    console.log(error)
    return []
   }
}

