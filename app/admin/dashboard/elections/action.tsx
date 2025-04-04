"use server";
import nodemailer from "nodemailer";


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
     const res = await pb.client.collection('voters').getFullList({
      sort: '-created',
  });
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
     const res = await pb.client.collection('voters_permit').getFullList({
      sort: '-created',
  });
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

interface PermitProp {
   email: string;
   name: string;
   permit: string;
   phone_number: string;
}

const BATCH_SIZE = 100; // Number of permits to process in a batch
const DELAY_MS = 10000; // Delay between batches in milliseconds
export async function sendMail(permits: { name: any; email: any; phone_number: any; permit: any; }[]) {
   const transport = nodemailer.createTransport({
     service: 'gmail',
     host: 'smtp.gmail.com',
     secure: true,
     port: 465,
     auth: {
       user: process.env.SMTP_EMAIL,
       pass: process.env.SMTP_PASSWORD,
     },
   });
 
   await new Promise((resolve, reject) => {
     transport.verify(function (error, success) {
       if (error) {
         console.log(error);
         reject(error);
       } else {
         console.log('Server is ready to take our messages');
         resolve(success);
       }
     });
   });
 
   const batches = [];
   for (let i = 0; i < permits.length; i += BATCH_SIZE) {
     batches.push(permits.slice(i, i + BATCH_SIZE));
   }
 
   for (const batch of batches) {
     await Promise.all(
       batch.map(async (permit: PermitProp) => {
         await new Promise((resolve, reject) => {
           transport.sendMail({
             from: process.env.SMTP_EMAIL,
             to: permit.email,
             subject: 'Vote Permit Code',
             html: `
               <h3>Hello ${permit.name}</h3>
               <p>Your Vote Permit Code is <h3>${permit.permit}</h3></p>
               <p>Use this code to vote, it is valid within the election period</p>
               <a href="https://www.udsmsaelection24.com/voter/permit">Click here to vote </a>
               <p>developed by ATS Tech <p>
             `,
           });
         });
 
         await new Promise((resolve, reject) => {
           const message = `Hello ${permit.name} Your Vote Permit Code is ${permit.permit} Use this code to vote, it is valid  within the election period Click here to vote https://www.udsmsaelection24.com/voter/permit`;
           fetch(`https://sms.arkesel.com/sms/api?action=send-sms&api_key=${process.env.SMS_API_KEY}&to=${permit.phone_number}&from=POLLPULSE&sms=${message}`);
         });
       })
     );
 
     // Delay between batches
     await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
   }
 
   return 'Successfully';
 }

export async function sendMailOld(permits: { name: any; email: any; phone_number: any; permit: any; }[]){
   const transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await new Promise((resolve, reject) => {
      // verify connection configuration
      transport.verify(function (error, success) {
          if (error) {
              console.log(error);
              reject(error);
          } else {
              console.log("Server is ready to take our messages");
              resolve(success);
          }
      });
  });

  
  permits.forEach(async (permit: PermitProp) => {
   await new Promise((resolve, reject) => {
   transport.sendMail({
       from: process.env.SMTP_EMAIL,
       to: permit.email,
       subject: "Vote Permit Code",
       html: `
       <h3>Hello ${permit.name}</h3>
       <p>Your Vote Permit Code is <h3>${permit.permit}</h3></p>
       <p>Use this code to vote, it is valid for 24hours</p>
       <a href="https://www.udsmsaelection24.com/voter/permit">Click here to vote </a>
       `,
     });
     
   });

   })
   permits.forEach(async (permit: PermitProp) => {
      await new Promise((resolve, reject) => {
         const message =  `
         Hello ${permit.name}
         Your Vote Permit Code is ${permit.permit}
         Use this code to vote, it is valid for 24hours
         Click here to vote 
         https://www.udsmsaelection24.com/voter/permit
        
         `
    
        fetch(`https://sms.arkesel.com/sms/api?action=send-sms&api_key=${process.env.SMS_API_KEY}&to=${permit.phone_number}&from=POLLPULSE&sms=${message}`)
       });
    
   })
   return "Succesfully"
}