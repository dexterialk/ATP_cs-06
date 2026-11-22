import "./team.css";

export default function Team() {
  return (
    <section className="team" id="team" aria-labelledby="team-title" data-ball-state="team-hidden" data-effect="reveal">
      <div className="container">
        <p className="section-label reveal">
          The team
        </p>
        <h2 id="team-title" className="reveal" style={{ "--d": ".1s" }}>
          Meet team{" "}
          <span translate="no">
            CS-06
          </span>
          .
        </h2>
        <p className="section-intro reveal" style={{ "--d": ".2s" }}>
          We are a student team on the University of Westminster Agile Team Project module (2026/27), building Dexteria for Coursework 1.
        </p>
        <ul className="team__grid" role="list">
          <li className="team-card reveal" style={{ "--d": "0s" }}>
            <img className="team-card__photo" src="/assets/images/team/avatar-placeholder.svg" alt="" width={400} height={400} loading="lazy" decoding="async" />
            <h3 className="team-card__name">
              Team member 1
            </h3>
            <p className="team-card__role">
              Product owner
            </p>
          </li>
          <li className="team-card reveal" style={{ "--d": "0.08s" }}>
            <img className="team-card__photo" src="/assets/images/team/avatar-placeholder.svg" alt="" width={400} height={400} loading="lazy" decoding="async" />
            <h3 className="team-card__name">
              Team member 2
            </h3>
            <p className="team-card__role">
              Scrum master
            </p>
          </li>
          <li className="team-card reveal" style={{ "--d": "0.16s" }}>
            <img className="team-card__photo" src="/assets/images/team/avatar-placeholder.svg" alt="" width={400} height={400} loading="lazy" decoding="async" />
            <h3 className="team-card__name">
              Team member 3
            </h3>
            <p className="team-card__role">
              UX and UI design
            </p>
          </li>
          <li className="team-card reveal" style={{ "--d": "0s" }}>
            <img className="team-card__photo" src="/assets/images/team/avatar-placeholder.svg" alt="" width={400} height={400} loading="lazy" decoding="async" />
            <h3 className="team-card__name">
              Team member 4
            </h3>
            <p className="team-card__role">
              Front-end development
            </p>
          </li>
          <li className="team-card reveal" style={{ "--d": "0.08s" }}>
            <img className="team-card__photo" src="/assets/images/team/avatar-placeholder.svg" alt="" width={400} height={400} loading="lazy" decoding="async" />
            <h3 className="team-card__name">
              Team member 5
            </h3>
            <p className="team-card__role">
              Hardware and sensors
            </p>
          </li>
          <li className="team-card reveal" style={{ "--d": "0.16s" }}>
            <img className="team-card__photo" src="/assets/images/team/avatar-placeholder.svg" alt="" width={400} height={400} loading="lazy" decoding="async" />
            <h3 className="team-card__name">
              Team member 6
            </h3>
            <p className="team-card__role">
              Testing and research
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
