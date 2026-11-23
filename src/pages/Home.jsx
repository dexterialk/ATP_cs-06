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
import TeamSection from "../sections/14-team/Team.jsx";
import Waitlist from "../sections/15-waitlist/Waitlist.jsx";
import Contact from "../sections/16-contact/Contact.jsx";

// One reusable word strip, used three times below.
import WordStrip from "../components/WordStrip/WordStrip.jsx";

// The moving ball layer (src/motion/choreography) follows whichever section is on screen. A section picks the ball's pose with
// data-ball-state; the hero and the waitlist carry their own ball, and sections without a preset hide the layer's ball.
export default function Home() {
  return (
    <>
      <Hero />                       {/* 01 */}
      <WordStrip tone="green" />     {/* after the hero, green like the original */}
      <ProblemStats />               {/* 02 */}
      <ProblemWeek />                {/* 03 */}
      <ProblemGaps />                {/* 04 */}
      <Impact />                     {/* 05 */}
      <WordStrip tone="cream" />     {/* before the Smart Ball explanation */}
      <SolutionDemo />               {/* 06 */}
      <Progress />                   {/* 07 */}
      <FeaturesSection />            {/* 08 */}
      <SolutionModes />              {/* 09 */}
      <TeamSection />                {/* 14 */}
      <Waitlist />                   {/* 15 */}
      <WordStrip tone="green" />     {/* green again, just above the contact section */}
      <Contact />                    {/* 16 (the footer, 17, is in the layout) */}
    </>
  );
}
