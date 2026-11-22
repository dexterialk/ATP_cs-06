This folder contains the individual HTML components and shared image assets developed for the landing page. Each team member can contribute their respective sections independently. The components will later be integrated into a single HTML file to create the complete landing page.

## Features and Team (Zaina)

- `components/features.html`: the Features section. Scrolling plays a short film of the ball and
  explains its six features. The film frames are in `images/features/` (`d/` for computers, `m/` for
  phones) and the script that plays them is `js/features.js`.
- `components/team.html`: the Team section, with photos in `images/team/`.
- Styles are in `css/features.css` and `css/team.css`. All class names start with `dx-feat-` or
  `dx-team-`, so they will not clash with other sections when everything goes into one file.
- Both use the colours from the logo and the Archivo font from Google Fonts.

When combining into one page: copy the `<link>` and `<script>` tags along with the section, and if the
page is not inside `components/`, change the `../` in the image, css and js paths (for the film, the
`data-frames` attribute on `#dx-features`).

These files are generated from the React version in
[ZainaZayan/Dexteria-featuresandteam](https://github.com/ZainaZayan/Dexteria-featuresandteam),
so please ask before editing them here.
