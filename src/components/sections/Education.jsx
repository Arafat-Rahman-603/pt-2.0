import SectionHeading from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * Timeline of education entries. Renders nothing until you set
 * `pages.home.education.enabled = true` and add items in portfolio.json:
 *   { "degree": "", "institution": "", "period": "", "description": "" }
 */
export default function Education({ data }) {
  if (!data?.enabled || !data.items?.length) return null;

  return (
    <section id="education" className="section-pad relative">
      <div className="container-x max-w-4xl">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} highlight={data.highlight} subtitle={data.subtitle} />
        <RevealGroup as="ol" className="relative space-y-8 border-l border-white/10 pl-8">
          {data.items.map((item) => (
            <RevealItem as="li" key={`${item.institution}-${item.period}`} className="relative">
              <span aria-hidden="true" className="absolute -left-[2.35rem] top-1.5 size-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
              <p className="font-mono text-xs text-cyan-300/80">{item.period}</p>
              <h3 className="mt-1 font-display text-xl font-semibold text-white">{item.degree}</h3>
              <p className="text-sm text-gray-400">{item.institution}</p>
              {item.description && <p className="mt-2 text-sm leading-relaxed text-gray-400">{item.description}</p>}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
