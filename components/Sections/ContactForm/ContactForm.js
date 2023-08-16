import { useState } from "react";

const ContactForm = () => {

    const [isSubmitted, setSubmitted] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
  
    const onSubmit = async (e) => {
        e.preventDefault()
        console.log("entro-------------------------------------------------");
        try {
            console.log("entro2");
            const res = await fetch('/api/sendEmail', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    email,
                    message,
                }),
                headers: {
                    'content-type': 'application/json',
                },
            });
            console.log("res: ", res);
            if (res.status === 200) {
                setSubmitted(true)
            }
        } catch (err) {
            console.error('Err', err)
        }
    }
  
    return isSubmitted ? (
        <div>
            <h1>
                Thank you for your message!
            </h1>
        </div>
    ) : (
        <form onSubmit={onSubmit}>
            <div>
                <label>
                    <span>Full Name</span>
                </label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Ethan Mick"
                />
            </div>
            <div>
                <label>
                    <span>Email</span>
                </label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="name@example.com"
                />
            </div>
            <div>
                <label>
                    <span>Message</span>
                </label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
            </div>
            <button type="submit">
                Submit
            </button>
      </form>
    )
}

export default ContactForm;
  