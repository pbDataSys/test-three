
//
export default function (config) {
  
  // config.addWatchTarget("src/javascript");
  //
  config.addPassthroughCopy('src/videos');
  config.addPassthroughCopy('src/_data');
  config.addPassthroughCopy('src/images');
  config.addPassthroughCopy('src/audio');
  config.addPassthroughCopy('src/css');
  config.addPassthroughCopy('src/javascript');
  config.addPassthroughCopy('src/posts');
  config.addPassthroughCopy('src/fonts');
  config.addPassthroughCopy('src/svg');
  config.addPassthroughCopy('_redirects');
  config.addPassthroughCopy('src/ico');

  //

  // Configure template engines and directories
  config.setTemplateFormats(['njk', 'md', 'html']);

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
}
