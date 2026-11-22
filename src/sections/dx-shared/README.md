# dx-shared

Styles and helpers shared by the Raika problem and solution sections (Raika 01, 02, 03, 04, 05, 07).

- `dx-shared.css`: the teammate's common styles (colours, wrapper, headings, stat cards, word-mask heading, pill buttons). Each section keeps only its own rules in its own folder. A zero-specificity rule at the top sends every element inside these sections back to the browser default, so the site's global base styles do not change the teammate's design. Two text colours were darkened to pass contrast (amber `#8F561C`, muted `#566055`).
- `dx-shared.js`: reduced-motion check (also true in Calm mode), count-up numbers, reveal on scroll and the word-mask heading. Each helper works only on the section it is given.
