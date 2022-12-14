const Container = require("./container");

const products = new Container("./data/products.json");

//Get all products or product selected
const getItems = (req, res) => {
  if (req.params.id == undefined) return res.send(products.getAll());
  const id = Number(req.params.id);
  const product = products.getById(id);
  if (!product)
    return res
      .status(404)
      .send({ message: "El ID no pertenece a un producto listado" });
  res.json(product);
};

//Add product
const addItem = (req, res) => {
  const { name, description, code, pic, price, stock } = req.body;
  products.save({ name, description, code, pic, price, stock });
  res.json({ message: "Producto agregado" });
};

//Update product
const updateItem = (req, res) => {
  const id = Number(req.params.id);
  if (id < 0 || id > products.objects.length)
    return res
      .status(400)
      .send({ message: "Ingresa el ID de un producto listado" });
  if (isNaN(id))
    return res
      .status(400)
      .send({ message: "Ingresa el ID de un producto listado" });
  products.update(id, req.body);
  res.json({ message: "Producto actualizado" });
};

//Delete product
const deleteItem = (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id))
    return res
      .status(400)
      .send({ message: "Ingresa el ID de un producto listado" });
  const productDeleted = products.deleteById(id);
  if (productDeleted === -1)
    return res
      .status(404)
      .json({ message: "El ID no pertenece a un producto listado" });
  res.json({ message: "Producto eliminado" });
};

module.exports = {
  products,
  getItems,
  addItem,
  updateItem,
  deleteItem,
};
