"use client";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { Reveal, PrimaryButton, GhostButton } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

const channels = [
  { label: "Email",    value: profile.email,     href: `mailto:${profile.email}`, accent: "#22D3EE" },
  { label: "Phone",    value: profile.phone,     href: profile.phoneHref,          accent: "#A3E635" },
  { label: "LinkedIn", value: "in/ujjvalgandhi", href: profile.linkedin,           accent: "#818CF8" },
  { label: "GitHub",   value: "UjjvalGandhi",    href: profile.github,             accent: "#F472B6" },
];

export default function Contact() {
  return (
    <section id="contact" className="section" style={{ paddingBottom: "5rem" }}>
      <div
        className="glass"
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "var(--r-lg)",
          padding: "clamp(2.5rem, 6vw, 5rem)",
        }}
      >
        {/* aurora wash inside the card */}
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background:
              "radial-gradient(ellipse 70% 100% at 10% 0%, rgba(34,211,238,.17), transparent 60%), radial-gradient(ellipse 70% 100% at 90% 100%, rgba(244,114,182,.14), transparent 60%)",
          }}
        />

        <div style={{ position: "relative" }}>
          <Reveal>
            <div
              className="mono"
              style={{
                display: "inline-flex", alignItems: "center", gap: ".6rem",
                fontSize: ".68rem", letterSpacing: ".2em", textTransform: "uppercase",
                color: "var(--text-faint)", marginBottom: "1.3rem",
              }}
            >
              <span style={{ color: "var(--cyan)" }}>06</span>
              <span style={{ width: 26, height: 1, background: "linear-gradient(90deg, var(--cyan), transparent)" }} />
              Contact
            </div>
          </Reveal>

          <Reveal delay={1}>
            <h2
              style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "clamp(2.4rem, 6.5vw, 5rem)", lineHeight: 1,
                letterSpacing: "-.045em", marginBottom: "1.4rem", maxWidth: 860,
              }}
            >
              Let&apos;s build something{" "}
              <span className="grad-text">worth shipping.</span>
            </h2>
          </Reveal>

          <Reveal delay={2}>
            <p style={{ fontSize: "1.02rem", lineHeight: 1.78, color: "var(--text-dim)", maxWidth: 520, marginBottom: "2.6rem" }}>
              Open to full-time roles and freelance work — full stack, Flutter, or Next.js and Node.
              Based in {profile.location}. Remote friendly.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="hero-cta" style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", marginBottom: "3.2rem" }}>
              <PrimaryButton href={`mailto:${profile.email}`}>Start a conversation →</PrimaryButton>
              <GhostButton href={profile.resumeUrl} target="_blank">Download résumé ↓</GhostButton>
            </div>
          </Reveal>

          <div
            className="contact-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: ".7rem" }}
          >
            {channels.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener" : undefined}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
                whileHover={{ y: -3 }}
                style={{
                  display: "grid", gap: ".35rem",
                  padding: "1.1rem 1.25rem", borderRadius: 13,
                  border: "1px solid var(--stroke)", background: "rgba(255,255,255,.028)",
                  textDecoration: "none", transition: "border-color .3s, background .3s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${c.accent}66`;
                  e.currentTarget.style.background = `${c.accent}0f`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--stroke)";
                  e.currentTarget.style.background = "rgba(255,255,255,.028)";
                }}
              >
                <span
                  className="mono"
                  style={{ fontSize: ".6rem", letterSpacing: ".16em", textTransform: "uppercase", color: c.accent }}
                >
                  {c.label}
                </span>
                <span
                  style={{
                    fontSize: ".86rem", fontWeight: 500, color: "var(--text)",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}
                >
                  {c.value}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
