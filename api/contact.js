import express from 'express'
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer'
require('dotenv').config()

const app = express()

// Body parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/send', async (req, res) => {
  const contactEmail = process.env.EMAIL_TO // Email to which messages should be sent
  const adminEmail = process.env.ADMIN_EMAIL // Email which will be used to send messages
  const adminPass = process.env.ADMIN_PASS // Pass to admin email

  const { firstName, lastName, email, tel, msgSubject, message } = req.body

  // Message template
  const output = `<div>
  <h2>Dziękujemy za kontakt z Nalewkami Staropolskimi</h2>
  <br/>
  <h4>
    Temat:<br/>
    ${msgSubject}
  </h4>
  <p>
    <b>Od:</b> ${firstName} ${lastName}<br/>
    <b>Email:</b> ${email} <br/>
    <b>Tel:</b> ${tel}
  </p>
  <br/>
  <br/>
  <p>
    <b>Wiadomość:</b><br/>
    ${message}
  </p>
</div>`

  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: adminEmail, // generated ethereal user
        pass: adminPass // generated ethereal password
      }
    })

    const info = await transporter.sendMail({
      from: `"Nalewki Staropolskie" <${contactEmail}>`, // sender address
      to: `${email}, ${contactEmail}`, // list of receivers
      subject: msgSubject, // Subject line
      html: output // html body
    })

    console.log('Message sent: %s', info.messageId)
    res.send('Success')
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

export default {
  path: '/api/contact',
  handler: app
}
