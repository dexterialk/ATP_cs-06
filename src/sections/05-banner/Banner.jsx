import "./banner.css";

export default function Banner() {
  return (
    <section className="banner" aria-labelledby="banner-title" data-ball-state="rise-from-under" data-ball-layer="back">
      <div className="banner__ball-slot" aria-hidden="true" data-ball-anchor=""></div>
      <div className="banner__strip on-dark">
        <div className="container banner__inner">
          <p className="section-label">
            The Smart Ball
          </p>
          <h2 id="banner-title">
            A squeeze that tells you more.
          </h2>
          <p className="banner__text">
            A soft, squeezable ball with sealed electronics inside. It measures grip pressure and movement as you practise, and sends each session to the Dexteria app.
          </p>
        </div>
      </div>
    </section>
  );
}
