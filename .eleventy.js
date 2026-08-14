const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.on("eleventy.before", async ({ directories }) => {
    const out = (directories && directories.output) || path.join(__dirname, "_site");
    fs.rmSync(path.resolve(out), { recursive: true, force: true });
  });

  eleventyConfig.addPassthroughCopy({ "images": "images" });
  eleventyConfig.addPassthroughCopy({ "assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "robots.txt": "robots.txt" });

  eleventyConfig.on("eleventy.after", async ({ directories }) => {
    const out = (directories && directories.output) || path.join(__dirname, "_site");
    fs.writeFileSync(path.join(out, ".nojekyll"), "");
  });

  eleventyConfig.addFilter("dateISO", function (date) {
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

  eleventyConfig.addFilter("crumbs", function (url) {
    const parts = String(url || "/").split("/").filter(Boolean);
    const crumbs = [{ label: "home", href: "/" }];
    let pathAcc = "";
    for (const part of parts) {
      pathAcc += "/" + part;
      crumbs.push({
        label: part.toLowerCase(),
        href: pathAcc.endsWith(".html") ? pathAcc : pathAcc + "/",
      });
    }
    return crumbs;
  });

  eleventyConfig.addTransform("lazyImages", function (content, outputPath) {
    if (outputPath && String(outputPath).endsWith(".html")) {
      return String(content).replace(
        /<img\b(?![^>]*\bloading=)/gi,
        '<img loading="lazy" decoding="async"'
      );
    }
    return content;
  });

  eleventyConfig.addTransform("scrollTables", function (content, outputPath) {
    if (!outputPath || !String(outputPath).endsWith(".html")) return content;
    return String(content).replace(
      /<table\b[\s\S]*?<\/table>/gi,
      (table) => `<div class="table-scroll">${table}</div>`
    );
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
