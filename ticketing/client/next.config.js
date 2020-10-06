module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 250;
    return config;
  },
};
