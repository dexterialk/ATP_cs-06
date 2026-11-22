export default function NotFound() {
  return (
    <article className="prose-page">
      <div className="prose">
        <h1>
          Page not found
        </h1>
        <p className="lead">
          We couldn’t find that page. It may have moved, or the link may be mistyped.
        </p>
        <p>
          <a className="button" href="/">
            Go to the Dexteria home page
          </a>
        </p>
      </div>
    </article>
  );
}
