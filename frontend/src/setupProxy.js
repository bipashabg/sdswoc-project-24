const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/v2', // Change this to your desired API route
    createProxyMiddleware({
      target: 'https://newsapi.org',
      changeOrigin: true,
    })
  );
};
