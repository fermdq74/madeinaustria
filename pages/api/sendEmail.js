import { sendEmail } from '../../lib/sendgrid';

export default async (req, res) => {
    //const { email } = req.body;
    const { name, email, message } = req.body;
    console.log("name: ", name);
    console.log("email: ", email);
    console.log("message: ", message);

    const msg = `
        <h3 style="background-color: #000; color: #fff; text-align: center; padding-top: 10px; padding-bottom: 10px;margin-bottom: 0;">
            Has recibido un nuevo mensaje desde el sitio web de Austria
        </h3>
        <h5 style="background-color: grey; padding-top: 10px; padding-bottom: 10px; text-align: center; margin-top: 0; margin-bottom: 0;">
            Nombre: ${name}
            <br>
            Email: ${email}
        </h5>
        <p style="border: 1px solid grey; border-top: none; padding: 10px; margin-top: 0;">
            ${message}
        </p>
    `;

    try {
        console.log("entro 5");
        await sendEmail(msg, 'Test Email');
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.log("entro 6");
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}