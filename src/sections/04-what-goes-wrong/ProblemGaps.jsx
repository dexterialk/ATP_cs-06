import "../dx-shared/dx-shared.css";
import "./problem-gaps.css";

// Raika 03: the problem (gaps). Converted from the teammate's HTML; the section script is in ./problem-gaps.js.
export default function ProblemGaps() {
  return (
      <section id="problem-gaps" className="dx-ps dx-problem" aria-labelledby="problem-gaps-title">
        <div className="dx-wrap">
          <div className="dx-stack">
            <div className="dx-stack__head">
              <p className="dx-hs__eyebrow">What goes wrong at home</p>
              <h3 className="dx-hs__title">Three gaps in recovery today</h3>
            </div>
            <ol className="dx-stack__list" id="dx-stack">
              <li className="dx-stack__item" style={{ "--n": "0" }}>
                <article className="dx-stack__card dx-stack__card--cream">
                  <div className="dx-stack__text">
                    <div className="dx-stack__top">
                      <span className="dx-stack__n">01</span>
                      <span className="dx-stack__tag">The gap</span>
                    </div>
                    <h4 className="dx-stack__t">Too little guided practice</h4>
                    <p className="dx-stack__p">A few hours of therapy each week. The rest happens at home, with no one to guide it.</p>
                  </div>
                  <div className="dx-stack__art" aria-hidden="true">
                    <span className="dx-stack__icon">
                      <svg viewBox="0 0 24 24">
                        <circle cx="12" cy="7" r="4" />
                        <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                      </svg>
                    </span>
                  </div>
                </article>
              </li>
              <li className="dx-stack__item" style={{ "--n": "1" }}>
                <article className="dx-stack__card dx-stack__card--ink">
                  <div className="dx-stack__text">
                    <div className="dx-stack__top">
                      <span className="dx-stack__n">02</span>
                      <span className="dx-stack__tag">The blind spot</span>
                    </div>
                    <h4 className="dx-stack__t">No record between visits</h4>
                    <p className="dx-stack__p">Between visits, all the therapist has to go on is what the patient remembers.</p>
                  </div>
                  <div className="dx-stack__art" aria-hidden="true">
                    <span className="dx-stack__icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M12 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v7" />
                        <path d="M8.5 3v2h5V3" />
                        <path d="M8 9.5h6M8 13.5h3.5" />
                        <circle cx="17.5" cy="17.5" r="4.25" />
                        <path d="M15.9 15.9l3.2 3.2M19.1 15.9l-3.2 3.2" />
                      </svg>
                    </span>
                  </div>
                </article>
              </li>
              <li className="dx-stack__item" style={{ "--n": "2" }}>
                <article className="dx-stack__card dx-stack__card--amber">
                  <div className="dx-stack__text">
                    <div className="dx-stack__top">
                      <span className="dx-stack__n">03</span>
                      <span className="dx-stack__tag">The drop-off</span>
                    </div>
                    <h4 className="dx-stack__t">Progress you can’t see</h4>
                    <p className="dx-stack__p">Is the hand getting stronger? Without numbers, nobody knows, so exercises never change and motivation fades.</p>
                  </div>
                  <div className="dx-stack__art" aria-hidden="true">
                    <span className="dx-stack__icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M2.5 18.5l4.5-5 3.5 3 3.5-4.5" />
                        <path d="M16.2 6.6a2.6 2.6 0 1 1 3.6 2.4c-.6.25-.95.8-.95 1.45v.85" />
                        <path d="M18.85 14.6v.01" />
                      </svg>
                    </span>
                  </div>
                </article>
              </li>
              <li className="dx-stack__item" style={{ "--n": "3" }}>
                <article className="dx-stack__card dx-stack__card--sage">
                  <div className="dx-stack__text">
                    <div className="dx-stack__top">
                      <span className="dx-stack__n">✓</span>
                      <span className="dx-stack__tag">The fix</span>
                    </div>
                    <h4 className="dx-stack__t">One small ball closes all three gaps.</h4>
                    <p className="dx-stack__p">Every squeeze guided. Every result saved. Every bit of progress on screen.</p>
                  </div>
                  <div className="dx-stack__art" aria-hidden="true">
                    <span className="dx-stack__icon">
                      <svg viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="8" />
                        <path d="M8.5 12.5l2.2 2.2 4.8-5" />
                      </svg>
                    </span>
                  </div>
                </article>
              </li>
            </ol>
          </div>
        </div>
      </section>
  );
}
