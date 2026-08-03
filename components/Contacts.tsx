"use client";

import React from "react";
import emailjs from "@emailjs/browser";

export default function Contacts() {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        try {
            await emailjs.sendForm(
                "service_ezyn98o",
                "template_1hr5rzx",
                form,
                "TZI9XtxmC9I9Z6LVL"
            );

            alert("Message sent successfully!");
            form.reset();

        } catch (error) {
            console.error(error);
            alert("Failed to send message.");
        }
    };

    return (
        <section className="relative min-h-screen">

            <div className="text-center font-bold mt-30">

                <h1 className="text-6xl font-bold opacity-100 translate-y-2 animate-[fadeDown_0.8s_ease-out_forwards]">
                    Contact me
                </h1>

                <p className="text-2xl mt-20 opacity-100 translate-y-2 animate-[fadeDown_0.8s_ease-out_forwards]">
                    Reach out to me on LinkedIn / GitHub
                </p>

            </div>

            <div className="mt-10 flex justify-center gap-8">

                <a
                    href="https://www.linkedin.com/in/c%C3%A9sar-dianov-91b3993a0/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
                >
                    <img
                        src="/linkedin-83.png"
                        alt="LinkedIn"
                        className="w-15 h-15 opacity-100 translate-y-2 animate-[fadeDown_0.8s_ease-out_forwards]"
                    />
                </a>

                <a
                    href="https://github.com/CesarDanielDianov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
                >
                    <img
                        src="/github.png"
                        alt="GitHub"
                        className="w-15 h-15 opacity-100 translate-y-2 animate-[fadeDown_0.8s_ease-out_forwards]"
                    />
                </a>

            </div>

            <div className="text-center mt-20">

                <p className="text-gray-500 opacity-100 translate-y-2 animate-[fadeDown_0.8s_ease-out_forwards]">
                    ───────────── &nbsp; OR &nbsp; ─────────────
                </p>

                <p className="mt-20 text-2xl opacity-100 translate-y-2 animate-[fadeDown_0.8s_ease-out_forwards]">
                    Use my contact form
                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="w-120 mx-auto space-y-6 mt-10"
            >

                <div>

                    <label className="font-bold">
                        Name
                    </label>

                    <input
                        name="name"
                        type="text"
                        placeholder="Your name"
                        required
                        className="w-full rounded-xl border border-gray-600 p-4"
                    />

                </div>

                <div>

                    <label className="font-bold">
                        Email
                    </label>

                    <input
                        name="email"
                        type="email"
                        placeholder="your@mail.com"
                        required
                        className="w-full rounded-xl border border-gray-600 p-4"
                    />

                </div>

                <div>

                    <label className="font-bold">
                        Message
                    </label>

                    <textarea
                        name="message"
                        rows={7}
                        placeholder="How can I help you?"
                        required
                        className="w-full rounded-xl border border-gray-600 p-4"
                    />

                </div>

                <button
                    type="submit"
                    className="w-full rounded-xl bg-cyan-500 text-white py-4 font-bold text-xl hover:bg-cyan-700 mb-10 transition"
                >
                    SEND MESSAGE →
                </button>

            </form>

        </section>
    );
}