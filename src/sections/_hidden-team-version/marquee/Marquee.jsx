import "./marquee.css";

export default function Marquee() {
  return (
    <div className="marquee" data-marquee="" data-ball-state="dock-right" data-effect="marquee">
      <div className="marquee__viewport" aria-hidden="true">
        <div className="marquee__track motion-loop">
          <p>
            <b>
              Move
            </b>
            <i></i>
            Mend
            <i></i>
            <b>
              Master
            </b>
            <i></i>
            Move
            <i></i>
            <b>
              Mend
            </b>
            <i></i>
            Master
            <i></i>
            <b>
              Move
            </b>
            <i></i>
            Mend
            <i></i>
            <b>
              Master
            </b>
            <i></i>
          </p>
          <p>
            <b>
              Move
            </b>
            <i></i>
            Mend
            <i></i>
            <b>
              Master
            </b>
            <i></i>
            Move
            <i></i>
            <b>
              Mend
            </b>
            <i></i>
            Master
            <i></i>
            <b>
              Move
            </b>
            <i></i>
            Mend
            <i></i>
            <b>
              Master
            </b>
            <i></i>
          </p>
        </div>
      </div>
      <button type="button" className="control marquee__pause" aria-pressed="false" data-marquee-pause="">
        <svg className="marquee__icon-pause" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <rect x="6" y="5" width={4} height={14} rx="1"></rect>
          <rect x="14" y="5" width={4} height={14} rx="1"></rect>
        </svg>
        <svg className="marquee__icon-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5Z"></path>
        </svg>
        Pause{" "}
        <span className="visually-hidden">
          scrolling slogan
        </span>
      </button>
    </div>
  );
}
