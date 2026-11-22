import Hero from "../sections/02-hero/Hero.jsx";
import Marquee from "../sections/03-marquee/Marquee.jsx";
import Problem from "../sections/04-problem/Problem.jsx";
import Banner from "../sections/05-banner/Banner.jsx";
import HowItWorks from "../sections/06-how-it-works/HowItWorks.jsx";
import KeyFeatures from "../sections/07-key-features/KeyFeatures.jsx";
import AppPreview from "../sections/08-app-preview/AppPreview.jsx";
import Team from "../sections/09-team/Team.jsx";
import Waitlist from "../sections/10-waitlist/Waitlist.jsx";
import ContactPrivacy from "../sections/11-contact-privacy/ContactPrivacy.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Problem />
      <Banner />
      <HowItWorks />
      <KeyFeatures />
      <AppPreview />
      <Team />
      <Waitlist />
      <ContactPrivacy />
    </>
  );
}
