"use client";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  // Endpoint: fallback to localhost if no env variable set
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
      className="py-20 px-6 md:px-16 bg-gray-100 dark:bg-gray-900 transition-colors"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Contact Me</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto flex flex-col gap-4"
      >
        <input
          name="name"
          placeholder="Your name"
          className="p-3 rounded bg-white dark:bg-gray-800 border focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          name="email"
          placeholder="Your email"
          type="email"
          className="p-3 rounded bg-white dark:bg-gray-800 border focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <textarea
          name="message"
          placeholder="Message"
          className="p-3 rounded bg-white dark:bg-gray-800 border h-36 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="submit"
          disabled={sending}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
        >
          {sending ? "Sending..." : "Send Message"}
        </button>

        <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-2">
          {status}
        </p>

        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-3">
          Or write directly to:{" "}
          <a
            href="mailto:arafat.rahman.6003@gmail.com"
            className="text-blue-500 hover:underline"
          >
            arafat.rahman.6003@gmail.com
          </a>
        </p>
      </form>
    </section>
  );
}
