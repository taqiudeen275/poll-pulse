import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

interface PermitProp {
    email: string;
    name: string;
    permit: string;
    phone_number: string;
}

export async function POST(request: Request){
  try {
      const {permit} = await request.json();
      // const { SMTP_EMAIL, SMTP_PASSWORD, SITE_URL, SMS_API_KEY } = process.env;
  
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
  

    permit.forEach(async (permit: PermitProp) => {
      await new Promise((resolve, reject) => {
      transport.sendMail({
          from: process.env.SMTP_EMAIL,
          to: permit.email,
          subject: "Vote Permit Code",
          html: `
          <h3>Hello ${permit.name}</h3>
          <p>Your Vote Permit Code is <h3>${permit.permit}</h3></p>
          <p>Use this code to vote, it is valid for 24hours</p>
          <a href="${process.env.SITE_URL}/voter/permit">Click here to vote </a>
          `,
        });
        
      });

      await new Promise((resolve, reject) => {
        const message =  `
        Hello ${permit.name}
        Your Vote Permit Code is ${permit.permit}
        Use this code to vote, it is valid for 24hours
        Click here to vote 
        ${process.env.SITE_URL}/voter/permit
       
        `

       fetch(`https://sms.arkesel.com/sms/api?action=send-sms&api_key=${process.env.SMS_API_KEY}&to=${permit.phone_number}&from=POLLPULSE&sms=${message}`)
      });

      })
    return NextResponse.json({message: "Voters Permit sent successfully"}, {status:200})
  } catch (error) {
      console.log(error)
    return NextResponse.json({message: "Something went wrong try again"}, {status:500})
      
  }
  }