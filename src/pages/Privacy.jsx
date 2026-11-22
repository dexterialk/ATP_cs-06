// Privacy notice page (/privacy/). Wording is Sima 03's; the page layout is unchanged.
// This is the only place the full notice lives; the footer and the waitlist note link to it.
export default function Privacy() {
  return (
    <article className="prose-page">
      <div className="prose">
        <h1>
          Privacy notice
        </h1>
        <p className="lead">
          When you join the Dexteria waitlist, your email address is submitted through our sign-up form, which is handled by Brevo. If you complete our linked questionnaire, the information you provide there is collected through that form.
        </p>
        <p>
          <strong>
            How we use it:
          </strong>
          {" "}We use the details you submit to communicate about Dexteria, including project updates, previews, and launch announcements. We do not sell your personal information.
        </p>
        <p>
          <strong>
            Your choice:
          </strong>
          {" "}Joining the waitlist is voluntary. You can unsubscribe from email updates using the unsubscribe option included in those emails. For questions about your information, contact{" "}
          <a href="mailto:dexteria.lk@gmail.com">
            dexteria.lk@gmail.com
          </a>
          .
        </p>
        <p>
          Please avoid submitting sensitive personal information through the waitlist or questionnaire.
        </p>
        <p>
          <a href="/">
            Back to the Dexteria home page
          </a>
        </p>
      </div>
    </article>
  );
}
