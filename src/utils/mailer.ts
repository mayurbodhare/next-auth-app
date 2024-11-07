import nodemailer from "nodemailer";
import bcrypt from "bcryptjs"
import User from "@/models/user.model";

export const sendEmail = async ({email, emailType, userId}:any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if(emailType === "VERIFY") {
          await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000});
        }else if (emailType === "VERIFY"){
          await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000});
        }
        
        const transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "f0757083c2471e",
            pass: "73956b161fe169"
          }
        });

          const mailOptions = {
            from: 'mrbodhre7@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste this link: ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, // html body
          }

          const mailResponse = await transport.sendMail(mailOptions);
          return mailResponse;

    } catch (error : any) {
        throw new Error(error.message)
    }
}