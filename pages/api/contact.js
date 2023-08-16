export default async function handler(req, res) {
    console.log('Data', req.body)
  
    const mailgun = new Mailgun(FormData)
    const client = mailgun.client({ username: 'api', key: API_KEY })
  
    const { name, email, message } = req.body
  
    const messageData = {
      from: 'Contact Form <santiagorinaldi97@gmail.com>',
      to: 'santiagorinaldi97@gmail.com',
      subject: 'New Contact Form!',
      text: `Hello,
  
      You have a new form entry from: ${name} ${email}.
  
      ${message}
      `,
    }
  
    try {
      const emailRes = await client.messages.create(DOMAIN, messageData)
      console.log(emailRes)
    } catch (err) {
      console.error('Error sending email', err)
    }
  
    res.status(200).json({ submitted: true })
}
  