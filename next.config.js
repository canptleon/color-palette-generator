// next.config.js
const webpack = require('webpack');

let hostConfig = {
  COLOR_PALETTE_GENERATOR_SITE: JSON.stringify("http://localhost:3000/"),
};

const env = process.env.APP_ENV || process.env.NODE_ENV || 'development';
hostConfig.APP_ENV = JSON.stringify(env);

module.exports = {
  async rewrites() {
    return [];
  },
  trailingSlash: false,
  webpack(config) {
    config.plugins.push(new webpack.DefinePlugin(hostConfig));
    return config;
  },
};
