import nodemailer from 'nodemailer'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

const sendEmail = async ({email, emailType, userId}) => {
    try {
      const hashedToken = await bcrypt.hash(userId.toString(), 10)
        
        if (emailType === "VERIFY") {

           
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpires: Date.now() + 3600000
                }
            )
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpires: Date.now() + 3600000
                }
            )
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "b9d6e72e72f1e1",
              pass: "c3b710d2d31ef3"
            }
          });
        // => .env

        const mailOptions = {
            from: 'delagneauadrien@yahooo.fr',
            to: email,
            subject: emailType === "VERIFY" ? "Verify Email" : "Reset Password",
            html: `<p><a href="${process.env.NEXTAUTH_URL}/verifyemail?token=${hashedToken}">Here</a> to${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}</p>`
        }

     const mailResponse =   await transport.sendMail(mailOptions)
   return mailResponse
    } catch (err) {
        throw new Error(err.message)
    }
}

export default sendEmail