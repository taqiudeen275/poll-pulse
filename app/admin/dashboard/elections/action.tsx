"use server";


import pb from "@/utils/my_pb"
import { cookies } from "next/headers"


export async function getElections(){
    try {
     const cookieStore = cookies()
     const authCookie = cookieStore.get('pb_auth')
     pb.client.authStore.loadFromCookie(authCookie?.value as any)
     const res = await pb.client.collection('elections').getFullList()
     return res
    } catch (error) {
     console.log(error)
     return []
    }
 }
 
 
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
 export async function updateElection(id:string, data:any){
   try {
    const cookieStore = cookies()
    const authCookie = cookieStore.get('pb_auth')
    pb.client.authStore.loadFromCookie(authCookie?.value as any)
    const res = await pb.client.collection('elections').update(id, data)
    return res
   } catch (error) {
    console.log(error)
    return {}
   }
}
 
 export async function getVotersPermit(){
    try {
     const cookieStore = cookies()
     const authCookie = cookieStore.get('pb_auth')
     pb.client.authStore.loadFromCookie(authCookie?.value as any)
     const res = await pb.client.collection('voters_permit').getFullList()
     return res
    } catch (error) {
     console.log(error)
     return []
    }
 }
 
 
export async function createElectionPermit(data:any){
    try {
     const cookieStore = cookies()
     const authCookie = cookieStore.get('pb_auth')
     pb.client.authStore.loadFromCookie(authCookie?.value as any)
     const res = await pb.client.collection('voters_permit').create(data)
     return res
    } catch (error) {
     console.log('error',error)
     return []
    }
 }
 
 export async function createVoterUser(data:any){
   try {
    const cookieStore = cookies()
    const authCookie = cookieStore.get('pb_auth')
    pb.client.authStore.loadFromCookie(authCookie?.value as any)
    const res = await pb.client.collection('voter_user').create(data)
    return res
   } catch (error) {
    console.log('error',error)
    return []
   }
}

