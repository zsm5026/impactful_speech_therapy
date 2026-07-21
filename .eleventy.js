function getPublishedPosts(collectionApi) {
  const now = new Date();
  return collectionApi.getFilteredByTag("post").filter(post => post.date <= now);
}

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
    return getPublishedPosts(collectionApi);
  });

  // Every unique category used across published posts, alphabetized.
  // Powers the category filter pills on the blog page.
  eleventyConfig.addCollection("allCategories", (collectionApi) => {
    const categories = new Set();
    getPublishedPosts(collectionApi).forEach(post => {
      (post.data.categories || []).forEach(cat => categories.add(cat));
    });
    return [...categories].sort((a, b) => a.localeCompare(b));
  });

  // Every unique tag used across published posts, alphabetized.
  // Powers the "filter by topic" dropdown on the blog page.
  eleventyConfig.addCollection("allTags", (collectionApi) => {
    const tags = new Set();
    getPublishedPosts(collectionApi).forEach(post => {
      (post.data.post_tags || []).forEach(tag => tags.add(tag));
    });
    return [...tags].sort((a, b) => a.localeCompare(b));
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "impactful_speech_therapy"
    }
  };
};
