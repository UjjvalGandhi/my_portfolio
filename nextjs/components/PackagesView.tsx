"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import type { PubPackage } from "./Packages";
import { SectionHeading } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

const ACCENTS: Record<string, string> = {
  liquid_glass_bottom_nav_native: "#22D3EE",
  liquid_glass_bottom_nav_cli: "#818CF8",
};

const GLYPH: Record<string, string> = {
  liquid_glass_bottom_nav_native: "◆",
  liquid_glass_bottom_nav_cli: "❯_",
};

/* navigator.clipboard needs a secure context and can still be refused, so
   fall back to the old execCommand path before giving up. */
async function writeToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the textarea path */
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

function Stat({ value, label, highlight }: { value: string; label: string; highlight?: boolean }) {
  return (
    <div style={{ display: "grid", gap: ".3rem" }}>
      <span
        className="mono"
        style={{
          fontSize: "1.05rem", fontWeight: 600, lineHeight: 1,
          color: highlight ? "var(--lime)" : "var(--text)",
        }}
      >
        {value}
      </span>
      <span
        className="mono"
        style={{ fontSize: ".58rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-faint)" }}
      >
        {label}
      </span>
    </div>
  );
}

function PackageCard({ pkg, index }: { pkg: PubPackage; index: number }) {
  const accent = ACCENTS[pkg.name] ?? "#22D3EE";
  const [copied, setCopied] = useState(false);
  const install = `flutter pub add ${pkg.name}`;
  const perfect = pkg.points === pkg.maxPoints;

  const copy = async () => {
    const ok = await writeToClipboard(install);
    if (!ok) return; // command stays on screen to copy by hand
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      whileHover={{ y: -5 }}
      className="glass glass-hover"
      style={{ padding: "1.9rem", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 170,
          background: `radial-gradient(ellipse at 15% 0%, ${accent}26, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.2rem" }}>
        <span
          className="mono"
          style={{
            display: "grid", placeItems: "center", width: 42, height: 42, borderRadius: 12,
            background: `${accent}14`, border: `1px solid ${accent}3d`, color: accent,
            fontSize: ".95rem", flexShrink: 0,
          }}
        >
          {GLYPH[pkg.name] ?? "◆"}
        </span>

        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            className="mono"
            style={{
              fontSize: ".88rem", fontWeight: 600, color: "var(--text)",
              wordBreak: "break-word", lineHeight: 1.35, marginBottom: ".3rem",
            }}
          >
            {pkg.name}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: ".45rem", flexWrap: "wrap" }}>
            <span className="mono" style={{ fontSize: ".66rem", color: accent }}>v{pkg.version}</span>
            <span style={{ color: "var(--text-faint)", fontSize: ".6rem" }}>·</span>
            <span className="mono" style={{ fontSize: ".66rem", color: "var(--text-faint)" }}>MIT</span>
            {perfect && (
              <span
                className="mono"
                style={{
                  fontSize: ".56rem", letterSpacing: ".12em", textTransform: "uppercase",
                  padding: ".2rem .5rem", borderRadius: 999,
                  border: "1px solid rgba(163,230,53,.3)", background: "rgba(163,230,53,.09)",
                  color: "var(--lime)",
                }}
              >
                Perfect score
              </span>
            )}
          </div>
        </div>
      </div>

      <p style={{ position: "relative", fontSize: ".89rem", lineHeight: 1.74, color: "var(--text-dim)", marginBottom: "1.3rem" }}>
        {pkg.description}
      </p>

      <div style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: ".35rem", marginBottom: "1.5rem" }}>
        {pkg.platforms.map(p => (
          <span
            key={p}
            className="mono"
            style={{
              fontSize: ".64rem", padding: ".26rem .58rem", borderRadius: 7,
              border: "1px solid var(--stroke)", background: "rgba(255,255,255,.03)",
              color: "var(--text-faint)",
            }}
          >
            {p}
          </span>
        ))}
      </div>

      <div style={{ position: "relative", marginTop: "auto" }}>
        {/* pub points meter */}
        <div style={{ marginBottom: "1.3rem" }}>
          <div
            style={{
              height: 4, borderRadius: 99, background: "rgba(255,255,255,.07)",
              overflow: "hidden", marginBottom: ".9rem",
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(pkg.points / pkg.maxPoints) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
              style={{
                height: "100%", borderRadius: 99,
                background: `linear-gradient(90deg, ${accent}, var(--lime))`,
                boxShadow: `0 0 12px ${accent}99`,
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            <Stat value={`${pkg.points}/${pkg.maxPoints}`} label="Pub points" highlight={perfect} />
            <Stat value={String(pkg.likes)} label="Likes" />
            <Stat value={String(pkg.downloads)} label="Downloads / 30d" />
          </div>
        </div>

        {/* install */}
        <button
          onClick={copy}
          className="mono"
          aria-label={`Copy install command for ${pkg.name}`}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: ".6rem",
            padding: ".7rem .85rem", borderRadius: 10, marginBottom: ".9rem",
            background: "rgba(0,0,0,.35)", border: "1px solid var(--stroke)",
            color: "var(--text-dim)", fontSize: ".7rem", textAlign: "left",
            overflow: "hidden",
          }}
        >
          <span style={{ color: accent, flexShrink: 0 }}>$</span>
          <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{install}</span>
          <span
            style={{
              flexShrink: 0, fontSize: ".58rem", letterSpacing: ".1em", textTransform: "uppercase",
              color: copied ? "var(--lime)" : "var(--text-faint)",
            }}
          >
            {copied ? "copied" : "copy"}
          </span>
        </button>

        <motion.a
          href={`https://pub.dev/packages/${pkg.name}`}
          target="_blank"
          rel="noopener"
          whileHover={{ x: 3 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: ".45rem",
            fontSize: ".78rem", fontWeight: 600, textDecoration: "none", color: accent,
          }}
        >
          View on pub.dev ↗
        </motion.a>
      </div>
    </motion.article>
  );
}

export default function PackagesView({ packages }: { packages: PubPackage[] }) {
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
        style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.1rem" }}
      >
        {packages.map((p, i) => <PackageCard key={p.name} pkg={p} index={i} />)}
      </div>
    </section>
  );
}
