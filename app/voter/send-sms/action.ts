"use server";
import nodemailer from "nodemailer";


import pb from "@/utils/my_pb"
import { cookies } from "next/headers"
import { delay } from "framer-motion";
import axios from "axios"

export async function getElections() {
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


export async function getVoters() {
  try {
    const cookieStore = cookies()
    const authCookie = cookieStore.get('pb_auth')
    pb.client.authStore.loadFromCookie(authCookie?.value as any)
    const res = await pb.client.collection('voters').getFullList({
      sort: '-created',
  });
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
    return {}
  }
}

export async function getVotersPermit() {
  try {
    const cookieStore = cookies()
    const authCookie = cookieStore.get('pb_auth')
    pb.client.authStore.loadFromCookie(authCookie?.value as any)
    const res = await pb.client.collection('voters_permit').getFullList({
      sort: '-created',
  });
    return res
  } catch (error) {
    console.log(error)
    return []
  }
}


export async function createElectionPermit(data: any) {
  try {
    const cookieStore = cookies()
    const authCookie = cookieStore.get('pb_auth')
    pb.client.authStore.loadFromCookie(authCookie?.value as any)
    const res = await pb.client.collection('voters_permit').create(data)
    return res
  } catch (error) {
    console.log('error', error)
    return []
  }
}

export async function createVoterUser(data: any) {
  try {
    const cookieStore = cookies()
    const authCookie = cookieStore.get('pb_auth')
    pb.client.authStore.loadFromCookie(authCookie?.value as any)
    const res = await pb.client.collection('voter_user').create(data)
    return res
  } catch (error) {
    console.log('error', error)
    return []
  }
}

interface PermitProp {
  email: string;
  name: string;
  permit: string;
  phone_number: string;
}

const BATCH_SIZE = 100; // Number of permits to process in a batch
const DELAY_MS = 10000; // Delay between batches in milliseconds
export async function sendMail(permit: { name: any; email: any; phone_number: any; permit: any; }) {
  
        const data = {
          "sender": "Hello world",
          "message": `Hello ${permit.name} Your Vote Permit Code is ${permit.permit} Use this code to vote, it is valid  within the election period Click here to vote https://www.udsmsaelection24.com/voter/permit`,
          "recipients": [`${permit.phone_number}`]
        };

        const config = {
          method: 'post',
          url: 'https://sms.arkesel.com/api/v2/sms/send',
          headers: {
            'api-key': `${process.env.SMS_API_KEY}`
          },
          data: data
        };

       await axios(config)


        console.log(`Sent ------------------------- ${permit}`)
    
  return 'Successfully';
}
