export default function Footer() {
  return (
    <footer style={{
      background: "#0e0704",
      textAlign: "center",
      padding: "1.5rem 3rem",
      borderTop: "1px solid rgba(244,164,96,.08)",
      color: "rgba(196,168,130,.4)",
      fontSize: ".7rem", letterSpacing: ".1em", textTransform: "uppercase",
      position: "relative", zIndex: 2,
    }}>
      © 2025 Ujjawal Gandhi · Flutter Developer · Anand, Gujarat ·{" "}
      <a href="http://www.ujjvalgandhi.online/" target="_blank" rel="noopener"
        style={{ color: "var(--sand)", textDecoration: "none", cursor: "none", opacity: 0.7 }}>
        ujjvalgandhi.online
      </a>
    </footer>
  );
}
