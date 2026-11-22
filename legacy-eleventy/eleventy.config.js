// Eleventy builds the site from index.njk (and the legal pages) into _site/.
//
// - Section and component templates live in src/ and are pulled in with
//   {% include %}. They are ignored as pages (see .eleventyignore).
// - Each section registers its own CSS with {% css %}. Eleventy collects it
//   into one hashed file that base.njk links with {% getBundleFileUrl "css" %}.
//   Cascade layers (declared in base.njk) keep the order predictable.
// - JavaScript is plain ES modules, copied as-is. No bundler.

export default function (eleventyConfig) {
  eleventyConfig.addBundle("css", { toFileDirectory: "bundle" });

  // Copy every JS module and asset to the same path under _site/, so import
  // paths are identical in source and output.
  eleventyConfig.addPassthroughCopy("src/**/*.js");
  eleventyConfig.addPassthroughCopy("src/assets");
  // public/ holds files served from the site root (favicon, robots.txt, social image).
  eleventyConfig.addPassthroughCopy({ public: "/" });

  eleventyConfig.addWatchTarget("src/");

  return {
    dir: {
      input: ".",
      includes: "src/_includes",
      data: "src/_data",
      output: "_site",
    },
    templateFormats: ["njk"],
    htmlTemplateEngine: "njk",
  };
}
