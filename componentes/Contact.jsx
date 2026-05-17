"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const contactInfo = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: "Email",
    value: "arafat.rahman.6003@gmail.com",
    href: "mailto:arafat.rahman.6003@gmail.com",
    color: "from-cyan-500 to-blue-500",
    glow: "rgba(6,182,212,0.35)",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: "Phone",
    value: "+880 1580-578264",
    href: "tel:+8801580578264",
    color: "from-violet-500 to-purple-600",
    glow: "rgba(139,92,246,0.35)",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: null,
    color: "from-emerald-500 to-teal-500",
    glow: "rgba(16,185,129,0.35)",
  },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Arafat-Rahman-603",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arafatrahman603",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100080753802018",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function FloatingInput({ label, name, type = "text", as = "input", rows }) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const Tag = as;
  const isFloating = focused || hasValue;

  return (
    <div className="relative">
      <Tag
        name={name}
        type={type}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
        className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-6 pb-3 text-white text-sm outline-none resize-none transition-all duration-300 placeholder-transparent focus:border-cyan-400/60 focus:bg-white/8"
        placeholder={label}
        style={{
          boxShadow: focused ? "0 0 0 1px rgba(6,182,212,0.3), 0 0 20px rgba(6,182,212,0.08)" : "none",
        }}
      />
      <label
        className="absolute left-4 text-gray-400 pointer-events-none transition-all duration-200"
        style={{
          top: isFloating ? "8px" : "50%",
          transform: as === "input" && !isFloating ? "translateY(-50%)" : "none",
          fontSize: isFloating ? "10px" : "14px",
          color: focused ? "rgb(34,211,238)" : "rgb(156,163,175)",
          letterSpacing: isFloating ? "0.06em" : "0",
          textTransform: isFloating ? "uppercase" : "none",
        }}
      >
        {label}
      </label>
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
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
      setStatus("error:Please fill in all fields.");
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
        setStatus("success:Message sent — I'll get back to you soon!");
        setSent(true);
        form.reset();
        setTimeout(() => { setSent(false); setStatus(""); }, 5000);
      } else {
        const error = await res.json().catch(() => null);
        setStatus(`error:${error?.error || "Failed to send message. Try again."}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("error:Network error. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  const [statusType, statusMsg] = status.split(/:(.+)/);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-28 px-6 md:px-16 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white"
    >
      {/* ── Background Orbs ── */}
      <div
        className="absolute top-[-60px] right-[-80px] w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute bottom-[-80px] left-[-80px] w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      {/* ── Section Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center mb-20 relative z-10"
      >
        <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-cyan-400 border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 rounded-full mb-5">
          Get In Touch
        </span>
        <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Let&apos;s{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">
            Work Together
          </span>
        </h2>
        <p className="mt-4 text-gray-400 text-base md:text-lg max-w-xl mx-auto">
          Have a project in mind or just want to say hello? Drop me a message — I&apos;d love to hear from you.
        </p>
      </motion.div>

      {/* ── Two-Column Layout ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10"
      >
        {/* ── Left: Contact Info + Socials ── */}
        <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col gap-6">
          {/* Info Cards */}
          {contactInfo.map((info, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03, y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center gap-4 rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                boxShadow: `0 4px 24px rgba(0,0,0,0.3)`,
              }}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${info.color} shadow-lg`}
                style={{ boxShadow: `0 4px 20px ${info.glow}` }}
              >
                {info.icon}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">{info.label}</p>
                {info.href ? (
                  <a
                    href={info.href}
                    className="text-sm text-white/80 hover:text-cyan-400 transition-colors duration-200 truncate block"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-sm text-white/80">{info.value}</p>
                )}
              </div>
            </motion.div>
          ))}

          {/* Social Links */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
            }}
          >
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Find Me On</p>
            <div className="flex gap-3">
              {socials.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Right: Contact Form ── */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-3 rounded-2xl p-8 relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 16px 60px rgba(0,0,0,0.4)",
          }}
        >
          {/* Corner glow */}
          <div
            className="absolute top-0 right-0 w-56 h-56 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
              filter: "blur(28px)",
              transform: "translate(40%,-40%)",
            }}
          />

          <h3 className="text-xl font-bold text-white mb-6 relative z-10">Send a Message</h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FloatingInput label="Your Name" name="name" />
              <FloatingInput label="Your Email" name="email" type="email" />
            </div>
            <FloatingInput label="Your Message" name="message" as="textarea" rows={6} />

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={sending}
              whileHover={!sending ? { scale: 1.03 } : {}}
              whileTap={!sending ? { scale: 0.97 } : {}}
              className="relative mt-2 w-full py-4 rounded-xl font-semibold text-white text-sm tracking-wide overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #6366f1)",
                boxShadow: "0 6px 30px rgba(6,182,212,0.35)",
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {sending ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </>
                )}
              </span>
            </motion.button>
          </form>

          {/* Status Message */}
          <AnimatePresence>
            {status && (
              <motion.div
                key={status}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.4 }}
                className="mt-4 px-4 py-3 rounded-xl text-sm flex items-center gap-2 relative z-10"
                style={{
                  background:
                    statusType === "success"
                      ? "rgba(16,185,129,0.12)"
                      : "rgba(239,68,68,0.12)",
                  border:
                    statusType === "success"
                      ? "1px solid rgba(16,185,129,0.3)"
                      : "1px solid rgba(239,68,68,0.3)",
                  color:
                    statusType === "success" ? "rgb(52,211,153)" : "rgb(252,165,165)",
                }}
              >
                {statusType === "success" ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                )}
                {statusMsg}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
