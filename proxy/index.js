const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(
  '/',
  createProxyMiddleware({
    target: 'https://images-api.nasa.gov/', // target host
    changeOrigin: true,
  })
);
app.listen(8080);