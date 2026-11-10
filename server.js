const path = require('path');
const express = require('express');
const app = express();

const paintingProvider = require('./scripts/painting-provider.js');
const paintingHandler = require('./scripts/painting-router.js');

const options = {
  root: path.join(__dirname, 'public')
};

app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/art', express.static(path.join(__dirname, 'art')));

app.get('/', (req, resp) => {
  resp.sendFile('index.html', options);
});

paintingHandler.handleAll(paintingProvider, app);
paintingHandler.handleUpdate(paintingProvider, app);

app.use((req, resp) => {
  resp.status(404).send('Unable to find the requested resource!');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Server running at port= ' + port);
});