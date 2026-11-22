import "./word-strip.css";

// The moving word strip from the teammate's solution notes (originally raiqa_08_solution-note-marquee.html, now removed from the project),
// converted to React with the same words, order and structure: "Squeeze, Hold, Steady, Progress", repeated,
// with a second copy so the loop is seamless. One component, imported in three places on the home page.
const WORDS = ["Squeeze", "Hold", "Steady", "Progress"];

function Group({ hidden }) {
  // Two runs of the four words, as in the original, each word followed by a dot.
  const items = [...WORDS, ...WORDS];
  return (
    <div className="word-strip__group" aria-hidden={hidden ? "true" : undefined}>
      {items.map((word, i) => (
        <span key={i} className="word-strip__item">
          <span className={`word-strip__word${i % 2 ? " word-strip__word--outline" : ""}`}>{word}</span>
          <span className="word-strip__dot" aria-hidden="true"></span>
        </span>
      ))}
    </div>
  );
}

export default function WordStrip() {
  return (
    <div className="word-strip" role="marquee" aria-label="Squeeze, hold, steady, progress">
      <div className="word-strip__track">
        <Group />
        <Group hidden />
      </div>
    </div>
  );
}
