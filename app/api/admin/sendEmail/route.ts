import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

interface PermitProp {
    email: string;
    name: string;
    permit: string;
}

export async function POST(request: Request){
try {
    const {permit} = await request.json();
const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: true,
  port: 587,
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASSWORD,
  },
});

try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.error({ error });
    return;
  }

  permit.forEach(async (permit: PermitProp) => {
    await transport.sendMail({
        from: SMTP_EMAIL,
        to: permit.email,
        subject: "Vote Permit Code",
        html: `
        <h3>Hello ${permit.name}</h3>
        <p>Your Vote Permit Code is <h3>${permit.permit}</h3></p>
        <p>Use this code to vote, it is valid for 24hours</p>
        `,
      });
  })
  return NextResponse.json({message: "Voters Permit sent successfully"}, {status:200})
} catch (error) {
    console.log(error)
  return NextResponse.json({message: "Something went wrong try again"}, {status:500})
    
}
}