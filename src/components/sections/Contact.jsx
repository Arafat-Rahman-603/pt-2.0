"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";

/** Floating-label field — pure CSS (peer + :placeholder-shown), no JS state. */
function Field({ field }) {
  const id = `contact-${field.name}`;
  const common = {
    id,
    name: field.name,
    required: true,
    placeholder: " ",
    autoComplete: field.autoComplete,
    className:
      "peer w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 pb-3 pt-6 text-sm text-white outline-none transition-[border-color,background-color,box-shadow] duration-300 focus:border-cyan-400/60 focus:bg-white/[0.07] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.1)]",
  };
  return (
    <div className="relative">
      {field.type === "textarea" ? <textarea rows={field.rows ?? 5} {...common} /> : <input type={field.type} {...common} />}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 text-[10px] uppercase tracking-[0.12em] text-cyan-300 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.12em] peer-focus:text-cyan-300"
      >
        {field.label}
      </label>
    </div>
  );
}

export default function Contact({ data, socials = [] }) {
  const [state, setState] = useState({ status: "idle", message: "" });
  const m = data.messages;

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const body = Object.fromEntries(
      data.fields.map((f) => [f.name, String(form.elements[f.name].value || "").trim()])
    );
    if (Object.values(body).some((v) => !v)) {
      setState({ status: "error", message: m.validation });
      return;
    }
    setState({ status: "sending", message: "" });
    try {
      const res = await fetch(data.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        form.reset();
        setState({ status: "success", message: m.success });
        setTimeout(() => setState({ status: "idle", message: "" }), 6000);
      } else {
        const err = await res.json().catch(() => null);
        setState({ status: "error", message: err?.error || m.failure });
      }
    } catch {
      setState({ status: "error", message: m.network });
    }
  };

  const sending = state.status === "sending";
  const textFields = data.fields.filter((f) => f.type !== "textarea");
  const areaFields = data.fields.filter((f) => f.type === "textarea");

  return (
    <section id="contact" className="section-pad relative">
      <div className="container-x">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} highlight={data.highlight} subtitle={data.subtitle} />

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Info */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {data.info.map((info, i) => {
              const Inner = (
                <>
                  <span
                    className="grid size-12 shrink-0 place-items-center rounded-xl text-white shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${info.accentFrom}, ${info.accentTo})` }}
                  >
                    <Icon name={info.icon} className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-[0.18em] text-gray-500">{info.label}</span>
                    <span className="block truncate text-sm text-white/90">{info.value}</span>
                  </span>
                </>
              );
              const cls = "glass flex items-center gap-4 rounded-2xl p-5 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-white/20";
              return (
                <Reveal key={info.label} delay={i * 0.08} x={-30} y={0}>
                  {info.href ? (
                    <a href={info.href} className={cls} data-cursor="hover">
                      {Inner}
                    </a>
                  ) : (
                    <div className={cls}>{Inner}</div>
                  )}
                </Reveal>
              );
            })}

            <Reveal delay={0.3} x={-30} y={0}>
              <div className="glass rounded-2xl p-5">
                <p className="mb-4 text-[11px] uppercase tracking-[0.18em] text-gray-500">Find me on</p>
                <ul className="flex gap-3">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="me noopener noreferrer"
                        data-cursor="hover"
                        className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-[color,transform,background-color] hover:-translate-y-1 hover:bg-white/10 hover:text-white"
                      >
                        <Icon name={s.icon} className="size-5" />
                        <span className="sr-only">{s.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1} y={50} className="lg:col-span-3">
            <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-8 md:p-10">
              <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-cyan-500/15 blur-3xl" />
              <h3 className="relative mb-6 font-display text-2xl font-semibold text-white">{data.formTitle}</h3>

              <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {textFields.map((f) => (
                    <Field key={f.name} field={f} />
                  ))}
                </div>
                {areaFields.map((f) => (
                  <Field key={f.name} field={f} />
                ))}

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileTap={{ scale: 0.98 }}
                  data-cursor="hover"
                  className="group relative mt-2 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 py-4 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(34,211,238,0.6)] transition-shadow hover:shadow-[0_14px_50px_-8px_rgba(34,211,238,0.8)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                      {m.sending}
                    </>
                  ) : (
                    <>
                      {m.submit}
                      <Send className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" aria-hidden="true" />
                    </>
                  )}
                </motion.button>

                <div aria-live="polite" className="min-h-0">
                  <AnimatePresence mode="wait">
                    {(state.status === "success" || state.status === "error") && (
                      <motion.p
                        key={state.message}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
                          state.status === "success"
                            ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                            : "border-red-400/30 bg-red-400/10 text-red-300"
                        }`}
                      >
                        {state.status === "success" ? (
                          <CircleCheck className="size-4 shrink-0" aria-hidden="true" />
                        ) : (
                          <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
                        )}
                        {state.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
