import connectDB from "@/DB/connectDB";
import User from "@/models/User";
import Joi from "joi";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

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
