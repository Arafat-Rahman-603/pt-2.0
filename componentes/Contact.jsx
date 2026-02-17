"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const endpoint = "https://get-mail-backend.onrender.com/send";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setSending(true);

    const form = e.target;
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    if (!data.name || !data.email || !data.message) {
      setStatus("⚠️ Please fill all fields.");
      setSending(false);
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("✅ Message sent — thank you!");
        form.reset();
      } else {
        const error = await res.json().catch(() => null);
        setStatus(error?.error || "❌ Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      setStatus("🌐 Network error. Try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-16 bg-gradient-to-b from-gray-950 to-black text-white"
    >
      {/* Title */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Contact Me
        </span>
      </motion.h2>

      {/* Form Container */}
      <motion.div
        className="max-w-lg mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-8 flex flex-col gap-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Your name"
            className="p-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
          <input
            name="email"
            type="email"
            placeholder="Your email"
            className="p-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
          <textarea
            name="message"
            placeholder="Your message"
            className="p-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 text-white h-36 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
          <button
            type="submit"
            disabled={sending}
            className="px-6 py-3 mt-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium shadow-lg hover:scale-105 transition transform disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Status Message */}
        <AnimatePresence>
          {status && (
            <motion.p
              key={status}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-center text-sm text-gray-300"
            >
              {status}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Direct Contact Info */}
        <div className="flex flex-col gap-2 text-center text-sm text-gray-400 mt-2">
          <p>
            📧 Email:{" "}
            <a
              href="mailto:arafat.rahman.6003@gmail.com"
              className="text-blue-400 hover:underline"
            >
              arafat.rahman.6003@gmail.com
            </a>
          </p>
          <p>
            📞 Phone:{" "}
            <a
              href="tel:+8801580578264"
              className="text-blue-400 hover:underline"
            >
              +8801580578264
            </a>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
