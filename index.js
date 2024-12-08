const express = require('express');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');

app.get('/', (req, res) => {
  res.send("This is a test");
});

app.use('/proxy', (req, res, next) => {
  createProxyMiddleware({
    target: 'https://official-joke-api.appspot.com/random_ten',
    changeOrigin: true,
    pathRewrite: {
        [`^/proxy`]: '',
    }
  })(req, res, next);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server is running on port 5000');
});

module.exports = app;