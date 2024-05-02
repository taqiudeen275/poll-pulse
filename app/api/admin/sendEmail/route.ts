import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

interface PermitProp {
    email: string;
    name: string;
    permit: string;
    phone_number: string;
}

export default async function POST(request: Request){
  try {
      const {permit} = await request.json();
 
      await new Promise((resolve, reject) => {
    permit.forEach(async (permit: PermitProp) => {
     
        const message =  `
        Hello ${permit.name}
        Your Vote Permit Code is ${permit.permit}
        Use this code to vote, it is valid for 24hours
        Click here to vote 
        https://www.udsmsaelection24.com/voter/permit
       
        `

       fetch(`https://sms.arkesel.com/sms/api?action=send-sms&api_key=${process.env.SMS_API_KEY}&to=${permit.phone_number}&from=POLLPULSE&sms=${message}`)
      });

      }).then(value => NextResponse.json({message: "Voters Permit sent successfully"}, {status:200})).catch(
        error => NextResponse.json({message: "Error occured"}, {status:500})
      )
    return NextResponse.json({message: "Voters Permit sent successfully"}, {status:200})
  } catch (error) {
      console.log(error)
    return NextResponse.json({message: "Something went wrong try again"}, {status:500})
      
  }
  }