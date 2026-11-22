import { SHOW_BALL_MOTION } from "../motion/ball-visibility.js";

// Sections, in page order. The folder number is the section's place on the page (see src/sections).
import Hero from "../sections/01-hero/Hero.jsx";
import ProblemStats from "../sections/02-problem/ProblemStats.jsx";
import ProblemWeek from "../sections/03-week-at-home/ProblemWeek.jsx";
import ProblemGaps from "../sections/04-what-goes-wrong/ProblemGaps.jsx";
import Impact from "../sections/05-why-it-matters/Impact.jsx";
import SolutionDemo from "../sections/06-how-dexteria-helps/SolutionDemo.jsx";
import Progress from "../sections/07-progress/Progress.jsx";
import FeaturesSection from "../sections/08-features/Features.jsx";
import SolutionModes from "../sections/09-app-three-ways/SolutionModes.jsx";
import TeamSection from "../sections/10-team/Team.jsx";
import Waitlist from "../sections/11-waitlist/Waitlist.jsx";
import Contact from "../sections/12-contact/Contact.jsx";

// One reusable word strip, used three times below.
import WordStrip from "../components/WordStrip/WordStrip.jsx";

// Earlier ball-motion and scroll-animation sections (kept in the code, hidden for now; see ball-visibility.js).
import Marquee from "../sections/_hidden-team-version/marquee/Marquee.jsx";
import Banner from "../sections/_hidden-team-version/banner/Banner.jsx";
import HowItWorks from "../sections/_hidden-team-version/how-it-works/HowItWorks.jsx";
import KeyFeatures from "../sections/_hidden-team-version/key-features/KeyFeatures.jsx";
import AppPreview from "../sections/_hidden-team-version/app-preview/AppPreview.jsx";
import Team from "../sections/_hidden-team-version/team/Team.jsx";

export default function Home() {
  return (
    <>
      <Hero />            {/* 01 */}
      <WordStrip />       {/* after the hero, where it fades into the Problem section */}
      <ProblemStats />    {/* 02 */}
      <ProblemWeek />     {/* 03 */}
      <ProblemGaps />     {/* 04 */}
      <Impact />          {/* 05 */}
      <WordStrip />       {/* before the Smart Ball explanation */}
      <SolutionDemo />    {/* 06 */}
      <Progress />        {/* 07 */}
      <FeaturesSection />   {/* 08 */}
      <SolutionModes />   {/* 09 */}
      <TeamSection />       {/* 10 */}
      <Waitlist />        {/* 11 */}
      <Contact />         {/* 12 (the footer, 13, is in the layout) */}
      <WordStrip />       {/* the very end of the page, above the footer */}

      {/* Hidden team version: not visible, takes no space. */}
      <div hidden={!SHOW_BALL_MOTION} data-hidden-team-version="">
        <Marquee />
        <Banner />
        <HowItWorks />
        <KeyFeatures />
        <AppPreview />
        <Team />
      </div>
    </>
  );
}
