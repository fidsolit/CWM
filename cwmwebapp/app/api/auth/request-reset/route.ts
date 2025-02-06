import connectDB from "@/DB/connectDB";
import User from "@/models/User";
import Joi, { string } from "joi";
import { NextResponse } from "next/server";
import { Resend } from "resend";

import { hash } from "bcryptjs";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (email: string, OTP: string) => {
  const emailTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="min-width: 100%; background-color: #f4f4f4;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td style="padding: 40px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <!-- Header -->
                      <tr>
                        <td style="padding-bottom: 32px; text-align: center;">
                          <h1 style="margin: 0; font-size: 24px; color: #333333;">Password Reset Request</h1>
                        </td>
                      </tr>
                      
                      <!-- Main Content -->
                      <tr>
                        <td style="padding-bottom: 24px;">
                          <p style="margin: 0; font-size: 16px; line-height: 24px; color: #555555;">Hello,</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 24px;">
                          <p style="margin: 0; font-size: 16px; line-height: 24px; color: #555555;">We received a request to reset your password. Here's your verification code:</p>
                        </td>
                      </tr>
                      
                      <!-- OTP Code -->
                      <tr>
                        <td style="padding: 24px 0; text-align: center;">
                          <div style="background-color: #f8f9fa; border-radius: 8px; padding: 24px; margin: 0 auto;">
                            <span style="font-family: 'Courier New', monospace; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #2563eb;">${OTP}</span>
                          </div>
                        </td>
                      </tr>
                      
                      <!-- Warning -->
                      <tr>
                        <td style="padding-bottom: 24px;">
                          <p style="margin: 0; font-size: 14px; line-height: 20px; color: #dc2626;">
                            This code will expire in 10 minutes. Do not share this code with anyone.
                          </p>
                        </td>
                      </tr>
                      
                      <!-- Footer -->
                      <tr>
                        <td style="padding-top: 32px; border-top: 1px solid #e5e7eb;">
                          <p style="margin: 0; font-size: 14px; line-height: 20px; color: #6b7280; text-align: center;">
                            If you didn't request this password reset, please ignore this email or contact support if you have concerns.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  await resend.emails.send({
    from: "FCODES <FCODES@resend.dev>",
    to: email,
    subject: "Password Reset Request - FCODES",
    html: emailTemplate,
  });
};

const schema = Joi.object({
  email: Joi.string().email().required(),
});

export async function POST(req: Request) {
  await connectDB();

  const { email, OTP } = await req.json();
  const { error } = schema.validate({ email });
  console.log("this is the OTP", OTP);

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
        await sendEmail(email, OTP);
        return NextResponse.json({
          success: true,
          message: "Code has been sent to your email",
        });
      } catch (error) {
        console.log("Error in sending email => ", error);
        return NextResponse.json({
          success: false,
          message: "Failed to send email. Please try again.",
        });
      }
    }
  } catch (error) {
    console.log("Error in resetting (server) => ", error);
    return NextResponse.json({
      success: false,
      message: "Something Went Wrong Please Retry Later!",
    });
  }
}
