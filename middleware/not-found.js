const notFound = async (req, res) => {
  return res
    .status(404)
    .send(`<h1>404</h1><p>Route: ${req.path} does not exist</p>`);
};

module.exports = notFound;
