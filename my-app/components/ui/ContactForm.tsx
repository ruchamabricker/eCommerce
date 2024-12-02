"use client"; 

import { useState } from 'react';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}

function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const [responseMessage, setResponseMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
            setResponseMessage('Please fill in all fields.');
            return;
        }

        try {
            const res = await fetch('/api/sendMail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.firstName + " " + formData.lastName,
                    email: formData.email,
                    message: formData.message,
                    subject: 'Your message has been received',
                    text: 'Thank you for contacting us! We have received your message and will get back to you shortly.',
                    html: `
                        <h3>Thank you for contacting us!</h3>
                        <p>We have received your message and will get back to you shortly.</p>
                        `,
                }),
            });

            if (res.ok) {
                setResponseMessage('Your message has been sent successfully!');
                setFormData({ firstName: '', lastName: '', email: '', message: '' }); 
            } else {
                setResponseMessage('Failed to send message. Please try again later.');
            }
        } catch (error) {
            setResponseMessage('An error occurred. Please try again.');
        }
    };


    return (
        <div className="p-4 py-6 rounded-lg bg-gray-50 dark:bg-gray-800 md:p-8">
            <form onSubmit={handleSubmit}>
                <div className="-mx-2 md:items-center md:flex">
                    <div className="flex-1 px-2">
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="John"
                            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"                        />
                    </div>

                    <div className="flex-1 px-2 mt-4 md:mt-0">
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Doe"
                            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"                                               />
                    </div>
                </div>

                <div className="mt-4">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="johndoe@example.com"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"                        />
                </div>

                <div className="w-full mt-4">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"                                             placeholder="Message"
                    ></textarea>
                </div>

                <button type="submit" 
                    className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gradient-to-r from-orange-500 via-purple-500 to-blue-400 rounded-lg hover:from-orange-400 hover:via-purple-400 hover:to-blue-300 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-50">                    Send message
                </button>
            </form>
            {responseMessage && <p className="mt-4" style={{ color: responseMessage.includes("successfully") ? "green" : "red" }}>{responseMessage}</p>}
        </div>
    );
}

export default ContactForm;
