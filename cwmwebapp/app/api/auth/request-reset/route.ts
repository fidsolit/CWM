import connectDB from "@/DB/connectDB";
import User from "@/models/User";
import Joi, { string } from "joi";
import { NextResponse } from "next/server";
import { Resend } from "resend";

import { hash } from "bcryptjs";
// import emailjs, { send } from "@emailjs/browser";

// const sendEmail = (email: string) => {
//   console.log("this is the email for sending", email);
//   const templateparms = {
//     username: "fidem0411@gmail.com",
//     email: "fidem0411@gmail.com",
//     temppass: "tp",
//   };
//   emailjs
//     .sendForm(
//       process.env.emailjs_serviceID ?? "",
//       process.env.emailjs_templateID ?? "",
//       templateparms as any,
//       { publicKey: process.env.emailjs_publicKey }
//     )
//     .then(
//       () => {
//         console.log("SUCCESS!");
//       },
//       (error: any) => {
//         console.log("FAILED to send email js", error.text);
//       }
//     );
//   console.log("Service ID:", process.env.emailjs_serviceID);
//   console.log("Template ID:", process.env.emailjs_templateID);
//   console.log("Public Key:", process.env.emailjs_publicKey);
//   console.log("Template Params:", templateparms);
// };

const resend = new Resend("re_5JyeEMad_GG7Tvk9pu7i2Nt6ctapXo4oL");

export const sendEmail = async (email: string) => {
  await resend.emails.send({
    from: "FCODES <onboarding@resend.dev>",
    to: email,
    subject: "RESET PASSWORD",
    html: "<p>This is your OTP Please dont share  <strong>39838</strong>!</p>",
  });
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
      try {
        const parasendemail = sendEmail(email);
        if (!parasendemail) {
          return NextResponse.json({
            success: false,
            message: "Email Not Sent resend email again",
          });
          console.log("email not send to user fede ");
        }
      } catch (error) {
        console.log("Error in sending email => ", error);
      }

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
