/* The visible 12-column grid the whole layout sits on. */
export default function GridRails() {
  return (
    <div className="grid-rails" aria-hidden>
      <div className="grid-rails__inner">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="grid-rails__col" />
        ))}
      </div>
    </div>
  );
}
