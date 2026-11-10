const handleAll = (paintingProvider, app) => {
  app.get('/api/paintings', (req, resp) => {
    resp.json(paintingProvider.getData());
  });
};

const handleUpdate = (paintingProvider, app) => {
  app.post('/api/paintings/:id', (req, resp) => {
    const result = paintingProvider.updateData(req.params.id, req.body);
    if (result.changes === 0) {
      resp.status(404).send('Painting not found');
    } else {
      resp.redirect('/');
    }
  });
};

module.exports = { handleAll, handleUpdate };