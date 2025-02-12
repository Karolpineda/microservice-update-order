const Order = require("../models/OrderModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Workshop = require("../models/workshopModel");

// Obtiene los datos de usuarios, productos y workshops para mostrarlos en el front
exports.getOptions = async (req, res) => {
  try {
    const [users, products, workshops] = await Promise.all([
      User.findAll(),
      Product.findAll(),
      Workshop.findAll(),
    ]);

    res.status(200).json({
      users,
      products,
      workshops,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;  // Obtén el ID de la orden desde los parámetros
    const { userId, productId, workshopId } = req.body;  // Obtén los nuevos datos del cuerpo de la solicitud

    // Busca la orden por su ID
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    // Actualiza los campos de la orden
    order.user_id = userId || order.user_id;
    order.product_id = productId || order.product_id;
    order.workshop_id = workshopId || order.workshop_id;

    // Guarda la orden actualizada
    await order.save();

    res.status(200).json({
      message: "Orden actualizada exitosamente",
      order, // Devuelve la orden actualizada
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
