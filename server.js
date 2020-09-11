/*eslint-disable*/
const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();
const app = express();

app.get('/token', async (req, res) => {
	const {data} = await axios.post(`${process.env.VUE_APP_FANTASY_API_URL}/token`, {
		// eslint-disable-next-line
		client_id: process.env.FANTASY_CLIENT_ID,
		secret: process.env.FANTASY_SECRET
	  });
    res.send({token: data.token});
});

app.use('/', serveStatic(path.join(__dirname, '/dist')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`app is listening on port: ${port}`);
