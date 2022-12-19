import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST, 
    port:process.env.MAIL_PORT,
    secure: true,
    auth :{
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
    }
})


const sendEMail = async (to,sub,text) =>{
    const mgs = {from: 'luffy@gmail.com', to, sub, text}
    await transport.sendMail(mgs)
}

// TODO: chưa thấy xài hàm này
const Verification = async (to,token) =>{
    const sub = "Email Verification"
    const verificationEmailUrl = `http://localhost:3000/${token}`
    const text = `Dear user,
    To verify your email, click on this link: ${verificationEmailUrl}
    If you did not create an account, then ignore this email.`
    await sendEMail(to,sub,text) // TODO: Tận dụng async không xài await chỗ này vì chờ mail gửi đi không cần thiết
}

// TODO: chưa thấy xài hàm này
const forgotPassword = async (to,token) =>{
    const sub = 'Reset Password'
    const resetPasswordUrl = `http://localhost:3000/${token}`
    const text = `Dear user,
    To reset your password, click on link: ${resetPasswordUrl}
    If you did not request any password resets, then ignore this email`
    await sendEMail(to,sub,text)
}

const Emailservice =  {transport, sendEMail, Verification,forgotPassword}

export default Emailservice
