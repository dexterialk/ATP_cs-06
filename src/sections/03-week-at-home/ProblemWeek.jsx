import "../dx-shared/dx-shared.css";
import "./problem-week.css";

// Raika 02: the problem (a week of hours). Converted from the teammate's HTML; the section script is in ./problem-week.js.
export default function ProblemWeek() {
  return (
      <section id="problem-week" className="dx-ps dx-problem" aria-labelledby="problem-week-title">
        <div className="dx-wrap">
          <figure className="dx-week js-reveal" id="dx-week">
            <div aria-hidden="true">
              <div className="dx-week__days">
                <div className="dx-week__row">
                  <span className="dx-week__day">Mon</span>
                  <span className="dx-dot" style={{ "--i": "0", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "1", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "2", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "3", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "4", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "5", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "6", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "7", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "8", "--k": "-1" }}></span>
                  <span className="dx-dot dx-dot--home" style={{ "--i": "9", "--k": "0" }}></span>
                  <span className="dx-dot" style={{ "--i": "10", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "11", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "12", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "13", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "14", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "15", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "16", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "17", "--k": "-1" }}></span>
                  <span className="dx-dot dx-dot--home" style={{ "--i": "18", "--k": "1" }}></span>
                  <span className="dx-dot" style={{ "--i": "19", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "20", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "21", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "22", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "23", "--k": "-1" }}></span>
                </div>
                <div className="dx-week__row">
                  <span className="dx-week__day">Tue</span>
                  <span className="dx-dot" style={{ "--i": "24", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "25", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "26", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "27", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "28", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "29", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "30", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "31", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "32", "--k": "-1" }}></span>
                  <span className="dx-dot dx-dot--home" style={{ "--i": "33", "--k": "2" }}></span>
                  <span className="dx-dot dx-dot--clinic" style={{ "--i": "34", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "35", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "36", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "37", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "38", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "39", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "40", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "41", "--k": "-1" }}></span>
                  <span className="dx-dot dx-dot--home" style={{ "--i": "42", "--k": "3" }}></span>
                  <span className="dx-dot" style={{ "--i": "43", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "44", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "45", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "46", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "47", "--k": "-1" }}></span>
                </div>
                <div className="dx-week__row">
                  <span className="dx-week__day">Wed</span>
                  <span className="dx-dot" style={{ "--i": "48", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "49", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "50", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "51", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "52", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "53", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "54", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "55", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "56", "--k": "-1" }}></span>
                  <span className="dx-dot dx-dot--home" style={{ "--i": "57", "--k": "4" }}></span>
                  <span className="dx-dot" style={{ "--i": "58", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "59", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "60", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "61", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "62", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "63", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "64", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "65", "--k": "-1" }}></span>
                  <span className="dx-dot dx-dot--home" style={{ "--i": "66", "--k": "5" }}></span>
                  <span className="dx-dot" style={{ "--i": "67", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "68", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "69", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "70", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "71", "--k": "-1" }}></span>
                </div>
                <div className="dx-week__row">
                  <span className="dx-week__day">Thu</span>
                  <span className="dx-dot" style={{ "--i": "72", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "73", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "74", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "75", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "76", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "77", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "78", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "79", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "80", "--k": "-1" }}></span>
                  <span className="dx-dot dx-dot--home" style={{ "--i": "81", "--k": "6" }}></span>
                  <span className="dx-dot" style={{ "--i": "82", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "83", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "84", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "85", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "86", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "87", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "88", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "89", "--k": "-1" }}></span>
                  <span className="dx-dot dx-dot--home" style={{ "--i": "90", "--k": "7" }}></span>
                  <span className="dx-dot" style={{ "--i": "91", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "92", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "93", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "94", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "95", "--k": "-1" }}></span>
                </div>
                <div className="dx-week__row">
                  <span className="dx-week__day">Fri</span>
                  <span className="dx-dot" style={{ "--i": "96", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "97", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "98", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "99", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "100", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "101", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "102", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "103", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "104", "--k": "-1" }}></span>
                  <span className="dx-dot dx-dot--home" style={{ "--i": "105", "--k": "8" }}></span>
                  <span className="dx-dot" style={{ "--i": "106", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "107", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "108", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "109", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "110", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "111", "--k": "-1" }}></span>
                  <span className="dx-dot dx-dot--clinic" style={{ "--i": "112", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "113", "--k": "-1" }}></span>
                  <span className="dx-dot dx-dot--home" style={{ "--i": "114", "--k": "9" }}></span>
                  <span className="dx-dot" style={{ "--i": "115", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "116", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "117", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "118", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "119", "--k": "-1" }}></span>
                </div>
                <div className="dx-week__row">
                  <span className="dx-week__day">Sat</span>
                  <span className="dx-dot" style={{ "--i": "120", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "121", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "122", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "123", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "124", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "125", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "126", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "127", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "128", "--k": "-1" }}></span>
                  <span className="dx-dot dx-dot--home" style={{ "--i": "129", "--k": "10" }}></span>
                  <span className="dx-dot" style={{ "--i": "130", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "131", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "132", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "133", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "134", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "135", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "136", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "137", "--k": "-1" }}></span>
                  <span className="dx-dot dx-dot--home" style={{ "--i": "138", "--k": "11" }}></span>
                  <span className="dx-dot" style={{ "--i": "139", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "140", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "141", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "142", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "143", "--k": "-1" }}></span>
                </div>
                <div className="dx-week__row">
                  <span className="dx-week__day">Sun</span>
                  <span className="dx-dot" style={{ "--i": "144", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "145", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "146", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "147", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "148", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "149", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "150", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "151", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "152", "--k": "-1" }}></span>
                  <span className="dx-dot dx-dot--home" style={{ "--i": "153", "--k": "12" }}></span>
                  <span className="dx-dot" style={{ "--i": "154", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "155", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "156", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "157", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "158", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "159", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "160", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "161", "--k": "-1" }}></span>
                  <span className="dx-dot dx-dot--home" style={{ "--i": "162", "--k": "13" }}></span>
                  <span className="dx-dot" style={{ "--i": "163", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "164", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "165", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "166", "--k": "-1" }}></span>
                  <span className="dx-dot" style={{ "--i": "167", "--k": "-1" }}></span>
                </div>
              </div>
              <div className="dx-week__hours">
                <span>12am</span>
                <span>6am</span>
                <span>12pm</span>
                <span>6pm</span>
              </div>
            </div>
            <figcaption className="dx-week__cap">
              <span className="dx-week__title">
                A week of practice, hour by hour
                <small>Each square is one hour. Switch between the two views to compare a week without Dexteria and a week with it.</small>
              </span>
              <span className="dx-week__toggle" role="group" aria-label="Compare a week">
                <button type="button" aria-pressed="true" data-with="0">Without Dexteria</button>
                <button type="button" aria-pressed="false" data-with="1">With Dexteria</button>
              </span>
              <span className="dx-week__big">168 hours in a week.</span>
              <span className="dx-week__split">
                <span className="dx-week__chip dx-week__chip--clinic">
                  <b>2</b>
                  <small>hours with a therapist</small>
                </span>
                <span className="dx-week__chip dx-week__chip--home">
                  <b id="dx-home-n">166</b>
                  <small id="dx-home-l">hours at home, on your own</small>
                </span>
              </span>
              <p className="dx-week__note" id="dx-week-note" aria-live="polite">At home there’s no one to check if the exercises are done right, or done at all.</p>
            </figcaption>
          </figure>
        </div>
      </section>
  );
}
