module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/Assets");

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC"
    });
  });

  eleventyConfig.addCollection("post", (collectionApi) => {
    const now = new Date();
    return collectionApi.getFilteredByTag("post").filter(post => post.date <= now);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "impactful_speech_therapy"
    }
  };
};
