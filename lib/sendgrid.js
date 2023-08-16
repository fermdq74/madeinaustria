import sgMail from '@sendgrid/mail';

export const sendEmail = async (text, subject) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log("ENTROOO");
    console.log("API KEY: ", process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'santiagorinaldi97@gmail.com',
        from: 'santiagorinaldi97@gmail.com',
        subject,
        text,
        html: text,
    };

    console.log("to: ", msg.to);
    console.log("subject: ", msg.subject);
    console.log("text: ", msg.text);
    console.log("from: ", msg.from);

    try {
        console.log("ENTROOO 1");
        await sgMail.send(msg);
        console.log(`Email sent to ${msg.to}`);
    } catch (error) {
        console.error("ERROR", error);
    }
};