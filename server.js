const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const fetch = require('node-fetch');

const compiler = webpack(webpackConfig);


app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.use(express.static(__dirname + '/www'));

app.get("/query/:search", function(req, res) {

    const search = req.params.search;
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${search}&utf8=&format=json`;

    fetch(url)
      .then(res => res.json())
      .then(response => {

        res.set("Content-Type", "application/json");
        res.send(response.query.search.map(x => x.title));
      })
      .catch(e => {

        res.send([]);

      })


  }

)


const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;

});
