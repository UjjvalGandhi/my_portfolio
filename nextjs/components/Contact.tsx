"use client";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { SectionHeading, Reveal, Button } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

const channels = [
  { label: "Email",    value: profile.email,     href: `mailto:${profile.email}` },
  { label: "Phone",    value: profile.phone,     href: profile.phoneHref },
  { label: "LinkedIn", value: "in/ujjvalgandhi", href: profile.linkedin },
  { label: "GitHub",   value: "UjjvalGandhi",    href: profile.github },
];

/* The one inverted block on the site — a deliberate full-bleed stop at
   the end of an otherwise white page. */
export default function Contact() {
  return (
    <section id="contact" style={{ background: "var(--bg-ink)", position: "relative", zIndex: 1 }}>
      <div
        style={{
          maxWidth: "var(--maxw)",
          margin: "0 auto",
          paddingInline: "var(--gut)",
          paddingBlock: "7rem",
          borderLeft: "1px solid var(--line-ink)",
          borderRight: "1px solid var(--line-ink)",
        }}
      >
        <SectionHeading
          index="06"
          eyebrow="Contact"
          title="Let's build something"
          accentWord="worth shipping."
          onInk
        />

        <Reveal>
          <p
            style={{
              fontSize: "1.05rem", lineHeight: 1.75, color: "var(--on-ink-2)",
              maxWidth: 520, marginBottom: "2.75rem", marginTop: "-2rem",
            }}
          >
            Open to full-time roles and freelance work — full stack, Flutter, or Next.js and Node.
            Based in {profile.location}. Remote friendly.
          </p>
        </Reveal>

        <Reveal delay={1}>
          <div className="hero-cta" style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginBottom: "4rem" }}>
            <Button variant="on-ink" href={`mailto:${profile.email}`}>Start a conversation</Button>
            <Button variant="on-ink-ghost" href={profile.resumeUrl} target="_blank">Résumé (PDF)</Button>
          </div>
        </Reveal>

        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            borderTop: "1px solid var(--line-ink)",
            borderLeft: "1px solid var(--line-ink)",
          }}
        >
          {channels.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener" : undefined}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
              style={{
                display: "grid",
                gap: ".5rem",
                padding: "1.4rem 1.2rem",
                borderRight: "1px solid var(--line-ink)",
                borderBottom: "1px solid var(--line-ink)",
                textDecoration: "none",
                transition: "background .2s var(--ease)",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#141414")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <span className="label" style={{ fontSize: ".56rem", color: "var(--on-ink-2)" }}>{c.label}</span>
              <span
                className="mono"
                style={{
                  fontSize: ".84rem", color: "var(--on-ink)",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}
              >
                {c.value}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
