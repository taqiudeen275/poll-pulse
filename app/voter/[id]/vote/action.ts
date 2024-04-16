"use server"
import pb from "@/utils/my_pb";
import { cookies } from 'next/headers';
import { RecordModel } from "pocketbase";


export async function getVotPermit(permit_id: string){
         const cookieStore = cookies()
     const authCookie = cookieStore.get('vpb_auth')
     pb.client.authStore.loadFromCookie(authCookie?.value as any)
      
     const voterSTUID = await pb.client.collection('voter_user').getOne(permit_id)
     const voterBySTU = await pb.client.collection('voters').getFirstListItem(`student_id="${voterSTUID.username}"`)
     return await pb.client.collection('voters_permit').getFirstListItem(`voter="${voterBySTU.id}"`)
    
 }

 export async function getPositions(){
   try {
    const cookieStore = cookies()
    const authCookie = cookieStore.get('vpb_auth')
    pb.client.authStore.loadFromCookie(authCookie?.value as any)
    return await pb.client.collection('positions').getFullList()
  
   } catch (error) {
    console.log(error)
    return []
   }
}

export async function getCandidates(){
   try {
    const cookieStore = cookies()
    const authCookie = cookieStore.get('vpb_auth')
    pb.client.authStore.loadFromCookie(authCookie?.value as any)

    return await pb.client.collection('candidates').getFullList()

    
   } catch (error) {
    console.log(error)
    return []
   }
}

export async function getElection(){
   
    const cookieStore = cookies()
    const authCookie = cookieStore.get('vpb_auth')
    pb.client.authStore.loadFromCookie(authCookie?.value as any)

    return await pb.client.collection('elections').getFirstListItem('isongoing=true')

}

export async function getBallot(voter_permit: string){
   const cookieStore = cookies()
   const authCookie = cookieStore.get('vpb_auth')
   pb.client.authStore.loadFromCookie(authCookie?.value as any)
   return await pb.client.collection('ballots').getFullList({filter: `permit="${voter_permit}"`})

}

 export async function createBallot(ballot: any){
    const cookieStore = cookies()
    const authCookie = cookieStore.get('vpb_auth')
    pb.client.authStore.loadFromCookie(authCookie?.value as any)
    const record = await pb.client.collection('ballots').create(ballot)
    return record
   
 }
 
 export async function updatesPermit(permit_id: string, data: any){
    const cookieStore = cookies()
    const authCookie = cookieStore.get('vpb_auth')
    pb.client.authStore.loadFromCookie(authCookie?.value as any)
    const record = await pb.client.collection('voters_permit').update(permit_id, data)
    return record
   
 }