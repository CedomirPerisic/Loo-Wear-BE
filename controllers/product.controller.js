export function addProduct(req, res) {
  const data = req.body;
  res.status(200).json({
    message: 'success',
    data
  })
}