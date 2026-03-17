import React, { useState } from 'react';

function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.name && form.email && form.message) {
            setSubmitted(true);
            setForm({ name: '', email: '', message: '' });
        }
    };

    return (
        <div className="page">
            <div className="section-divider"></div>
            <h1 className="section-title">Contact Us</h1>
            <p className="section-subtitle">We'd love to hear from you.</p>

            <div className="contact-layout">
                <div className="contact-info">
                    <p>
                        Have a question, feedback, or just want to say hello? Fill out the form and our
                        team will get back to you within 24 hours.
                    </p>
                    <div className="contact-item">
                        <div className="contact-item-icon">📍</div>
                        <span>123 Commerce Street, Islamabad, PK</span>
                    </div>
                    <div className="contact-item">
                        <div className="contact-item-icon">📧</div>
                        <span>support@shoplite.com</span>
                    </div>
                    <div className="contact-item">
                        <div className="contact-item-icon">📞</div>
                        <span>+92 300 1234567</span>
                    </div>
                    <div className="contact-item">
                        <div className="contact-item-icon">🕐</div>
                        <span>Mon–Fri, 9am – 6pm PKT</span>
                    </div>
                </div>

                <div className="form-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Your full name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Write your message here..."
                                value={form.message}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary">Send Message</button>
                    </form>

                    {submitted && (
                        <div className="form-success">
                            ✅ Thanks! Your message has been sent. We'll be in touch soon.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Contact;