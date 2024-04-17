'use server'
import pb from "@/utils/my_pb";
import { cookies } from 'next/headers';
import { NextResponse } from "next/server";


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

 export async function getCandidates(){
    try {
     const cookieStore = cookies()
     const authCookie = cookieStore.get('pb_auth')
     pb.client.authStore.loadFromCookie(authCookie?.value as any)
     const res = await pb.client.collection('candidates').getFullList()
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

export async function getVotes(electionID: string){
   try {
    const cookieStore = cookies()
    const authCookie = cookieStore.get('pb_auth')
    pb.client.authStore.loadFromCookie(authCookie?.value as any)
    const election = await pb.client.collection('elections').getOne(electionID)
    const res = await pb.client.collection('ballots').getFullList({filter: `election="${election.id}"`})
    return res
   } catch (error) {
    console.log(error)
    return []
   }
}
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

export async function getPosition(){
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

export async function updateElection(id: string, data: any) {
   try {
    const cookieStore = cookies()
    const authCookie = cookieStore.get('pb_auth')
    pb.client.authStore.loadFromCookie(authCookie?.value as any)
    const res = await pb.client.collection('elections').update(id, data)
    return res
   } catch (error) {
    console.log(error)
    return []
   }
}


export async function createCandidatesResults(data: any) {
   try {
    const cookieStore = cookies()
    const authCookie = cookieStore.get('pb_auth')
    pb.client.authStore.loadFromCookie(authCookie?.value as any)
    const res = await pb.client.collection('candidates_votes').create(data)
    return res
   } catch (error) {
    console.log(error)
    return []
   }
}



