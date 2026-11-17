"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import type { PubPackage } from "./Packages";
import { SectionHeading } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

/* navigator.clipboard needs a secure context and can still be refused, so
   fall back to the old execCommand path before giving up. */
async function writeToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:0;left:-9999px;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

function Stat({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div style={{ display: "grid", gap: ".3rem" }}>
      <span
        className="mono"
        style={{ fontSize: "1.05rem", fontWeight: 600, lineHeight: 1, color: accent ? "var(--accent)" : "var(--ink)" }}
      >
        {value}
      </span>
      <span className="label" style={{ fontSize: ".56rem" }}>{label}</span>
    </div>
  );
}

function PackageCard({ pkg, index }: { pkg: PubPackage; index: number }) {
  const [copied, setCopied] = useState(false);
  const install = `flutter pub add ${pkg.name}`;
  const perfect = pkg.points === pkg.maxPoints;

  const copy = async () => {
    if (!(await writeToClipboard(install))) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
      style={{
        padding: "1.9rem 1.75rem",
        borderRight: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex", alignItems: "baseline", gap: ".6rem", flexWrap: "wrap",
          paddingBottom: ".9rem", marginBottom: "1.25rem",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <span className="mono" style={{ fontSize: ".86rem", fontWeight: 600, color: "var(--ink)", wordBreak: "break-word" }}>
          {pkg.name}
        </span>
        <span className="mono" style={{ fontSize: ".68rem", color: "var(--accent)" }}>v{pkg.version}</span>
        <span className="mono" style={{ fontSize: ".66rem", color: "var(--ink-3)" }}>MIT</span>
        {perfect && (
          <span
            className="mono"
            style={{
              marginLeft: "auto", fontSize: ".56rem", letterSpacing: ".1em",
              textTransform: "uppercase", padding: ".2rem .45rem",
              background: "var(--accent-bg)", color: "var(--accent-2)",
              whiteSpace: "nowrap",
            }}
          >
            Perfect score
          </span>
        )}
      </div>

      <p style={{ fontSize: ".9rem", lineHeight: 1.7, color: "var(--ink-2)", marginBottom: "1.4rem" }}>
        {pkg.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem", marginBottom: "1.75rem" }}>
        {pkg.platforms.map(p => (
          <span
            key={p}
            className="mono"
            style={{ fontSize: ".66rem", padding: ".22rem .5rem", border: "1px solid var(--line)", color: "var(--ink-3)" }}
          >
            {p}
          </span>
        ))}
      </div>

      <div style={{ marginTop: "auto" }}>
        {/* pub points meter */}
        <div style={{ height: 3, background: "var(--line)", marginBottom: "1rem" }}>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${(pkg.points / pkg.maxPoints) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            style={{ height: "100%", background: "var(--accent)" }}
          />
        </div>

        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          <Stat value={`${pkg.points}/${pkg.maxPoints}`} label="Pub points" accent={perfect} />
          <Stat value={String(pkg.likes)} label="Likes" />
          <Stat value={String(pkg.downloads)} label="Downloads / 30d" />
        </div>

        <button
          onClick={copy}
          className="mono"
          aria-label={`Copy install command for ${pkg.name}`}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: ".6rem",
            padding: ".7rem .8rem", marginBottom: "1.1rem",
            background: "var(--bg-alt)", border: "1px solid var(--line)",
            color: "var(--ink-2)", fontSize: ".72rem", textAlign: "left",
            cursor: "pointer", overflow: "hidden",
          }}
        >
          <span style={{ color: "var(--ink-3)", flexShrink: 0 }}>$</span>
          <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{install}</span>
          <span
            className="label"
            style={{ flexShrink: 0, fontSize: ".54rem", color: copied ? "var(--accent)" : "var(--ink-3)" }}
          >
            {copied ? "Copied" : "Copy"}
          </span>
        </button>

        <a
          className="link mono"
          href={`https://pub.dev/packages/${pkg.name}`}
          target="_blank"
          rel="noopener"
          style={{ fontSize: ".78rem", fontWeight: 500 }}
        >
          View on pub.dev ↗
        </a>
      </div>
    </motion.article>
  );
}

export default function PackagesView({ packages }: { packages: PubPackage[] }) {
  const totalDownloads = packages.reduce((n, p) => n + p.downloads, 0);

  return (
    <section id="packages" className="section">
      <SectionHeading
        index="05"
        eyebrow="Open source"
        title="Packages I"
        accentWord="published"
        lead="Live stats pulled from pub.dev. The native tab bar scores 160/160 — the maximum pub.dev awards."
      />

      <div
        className="pkg-grid"
        style={{
          display: "grid",
          borderTop: "1px solid var(--line)",
          borderLeft: "1px solid var(--line)",
        }}
      >
        {packages.map((p, i) => <PackageCard key={p.name} pkg={p} index={i} />)}

        {/* Third cell so a wider row resolves instead of trailing a gap. */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
          style={{
            padding: "1.9rem 1.75rem",
            borderRight: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
            background: "var(--bg-alt)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span className="label" style={{ marginBottom: "1.5rem" }}>In total</span>

          <div style={{ display: "grid", gap: "1.4rem", marginBottom: "auto" }}>
            <span style={{ display: "grid", gap: ".3rem" }}>
              <span className="display" style={{ fontSize: "2.1rem", color: "var(--ink)" }}>
                {totalDownloads.toLocaleString("en-US")}
              </span>
              <span className="label" style={{ fontSize: ".56rem" }}>Downloads, last 30 days</span>
            </span>
            <span style={{ display: "grid", gap: ".3rem" }}>
              <span className="display" style={{ fontSize: "2.1rem", color: "var(--ink)" }}>
                {packages.length}
              </span>
              <span className="label" style={{ fontSize: ".56rem" }}>Published packages</span>
            </span>
          </div>

          <p className="measure" style={{ fontSize: ".88rem", lineHeight: 1.7, color: "var(--ink-2)", margin: "1.75rem 0 1.25rem" }}>
            Both are MIT licensed and maintained in the open, with the native iOS side written in
            Swift against UIKit.
          </p>

          <a
            className="link mono"
            href="https://pub.dev/publishers/ujjvalgandhi.online/packages"
            target="_blank"
            rel="noopener"
            style={{ fontSize: ".78rem", fontWeight: 500 }}
          >
            All packages ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
