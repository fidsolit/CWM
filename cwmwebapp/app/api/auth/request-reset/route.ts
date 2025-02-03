import connectDB from "@/DB/connectDB";
import User from "@/models/User";
import Joi, { string } from "joi";
import { NextResponse } from "next/server";

import { hash } from "bcryptjs";
import emailjs, { send } from "@emailjs/browser";

const sendEmail = (email: string) => {
  console.log("this is the email for sending", email);
  const templateparms = {
    username: "fidem0411@gmail.com",
    email: "fidem0411@gmail.com",
    temppass: "tp",
  };
  emailjs
    .sendForm(
      process.env.emailjs_serviceID as string,
      process.env.emailjs_templateID as string,
      templateparms as any,
      {
        publicKey: process.env.emailjs_publicKey,
      }
    )
    .then(
      () => {
        console.log("SUCCESS!");
      },
      (error: any) => {
        console.log("FAILED to send email js", error.text);
      }
    );
};

const schema = Joi.object({
  email: Joi.string().email().required(),
});

export async function POST(req: Request) {
  await connectDB();

  const { email } = await req.json();
  const { error } = schema.validate({ email });

  if (error)
    return NextResponse.json({
      success: false,
      message: error.details[0].message.replace(/['"]+/g, ""),
    });

  try {
    const ifExist = await User.findOne({ email });

    if (!ifExist) {
      return NextResponse.json({
        success: false,
        message: "Email Not Found",
      });
    } else {
      sendEmail(email);

      //   const hashedPassword = await hash(password, 12);
      //   const createUser = await User.create({
      //     email,
      //     name,
      //     password: hashedPassword,
      //     role: "user",
      //   });
      // if (createUser)
      return NextResponse.json({
        success: true,
        message: "Code has sent to your email",
      });
      console.log("for send email to user");
    }
  } catch (error) {
    console.log("Error in reseting (server) => ", error);
    return NextResponse.json({
      success: false,
      message: "Something Went Wrong Please Retry Later !",
    });
  }
}
