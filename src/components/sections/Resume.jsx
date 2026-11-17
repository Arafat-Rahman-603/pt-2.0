"use client";
import { useRef, useState } from "react";
import { Download, Eye, FileText, X } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Resume({ data }) {
  const dialog = useRef(null);
  const [loaded, setLoaded] = useState(false); // only mount the PDF iframe once opened

  const open = () => {
    setLoaded(true);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();

  return (
    <section id="resume" className="section-pad relative">
      <div className="container-x">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} highlight={data.highlight} subtitle={data.subtitle} />

        <Reveal y={50} className="mx-auto max-w-3xl">
          <div className="glass relative overflow-hidden rounded-[2rem] p-8 text-center md:p-12">
            <div aria-hidden="true" className="absolute -left-20 -top-20 size-60 rounded-full bg-cyan-500/20 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-20 -right-20 size-60 rounded-full bg-violet-500/20 blur-3xl" />
            <span className="relative mx-auto mb-6 grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 text-white shadow-[0_10px_40px_-10px_rgba(34,211,238,0.6)]">
              <FileText className="size-7" aria-hidden="true" />
            </span>
            <div className="relative flex flex-wrap justify-center gap-4">
              <MagneticButton href={data.file} download>
                <Download className="size-4" aria-hidden="true" />
                {data.downloadLabel}
              </MagneticButton>
              <MagneticButton onClick={open} variant="ghost" aria-haspopup="dialog">
                <Eye className="size-4" aria-hidden="true" />
                {data.viewLabel}
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </div>

      <dialog
        ref={dialog}
        className="modal m-auto w-[min(64rem,calc(100%-2rem))] overflow-hidden rounded-2xl border border-white/10 bg-[#0b1022] p-0 text-white shadow-2xl"
        aria-labelledby="resume-title"
        onClick={(e) => e.target === e.currentTarget && close()}
        data-lenis-prevent
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
          <h3 id="resume-title" className="font-display text-lg font-semibold">{data.modalTitle}</h3>
          <div className="flex gap-2">
            <a href={data.file} download className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black hover:bg-cyan-300">
              Download
            </a>
            <button onClick={close} className="grid size-9 place-items-center rounded-full border border-white/15 hover:bg-white/10" aria-label="Close resume preview">
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="h-[75dvh] bg-white/5">
          {loaded && <iframe src={data.file} title="Resume preview" className="size-full" />}
        </div>
      </dialog>
    </section>
  );
}
