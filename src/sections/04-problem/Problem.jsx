import "./problem.css";

export default function Problem() {
  return (
    <section className="problem on-dark" id="why" aria-labelledby="problem-title" data-ball-state="behind" data-effect="reveal">
      <div className="problem__inner container">
        <figure className="problem__media reveal">
          <img src="/assets/images/problem/problem-placeholder.svg" alt="Placeholder illustration of two cupped hands holding a soft, sage-grey exercise ball" width={800} height={1000} loading="lazy" decoding="async" />
        </figure>
        <div className="problem__copy">
          <p className="section-label reveal">
            Why it matters
          </p>
          <h2 id="problem-title" className="reveal" style={{ "--d": ".1s" }}>
            Home practice is hard to keep up.
          </h2>
          <p className="reveal" style={{ "--d": ".2s" }}>
            Hand exercises often happen alone at home, between appointments. Without feedback, it is easy to lose track, lose motivation, or stop.
          </p>
          <p className="reveal" style={{ "--d": ".3s" }}>
            Clinicians have little to go on between sessions. They see how you are doing on the day, not how your practice went the week before.
          </p>
          <p className="problem__note reveal" style={{ "--d": ".4s" }}>
            Dexteria is a wellness product. It supports your physiotherapy and does not replace it.
          </p>
        </div>
      </div>
    </section>
  );
}
