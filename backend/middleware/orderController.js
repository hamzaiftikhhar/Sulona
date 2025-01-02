// backend/middleware/orderController.js
const Order = require('../models/Order');
const Cart = require('../models/Cart');

const createOrder = async (req, res) => {
  try {
    const { formData, cart, subtotal, shipping, total } = req.body;
    
    // Transform cart items to order items format
    const orderItems = cart.map(item => ({
      productId: item._id,
      name: item.name,
      quantity: item.quantity,
      price: item.price
    }));

    // Create new order
    const order = new Order({
      userId: req.user?.id, // If user is authenticated
      email: formData.email,
      shippingDetails: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city
      },
      items: orderItems,
      subtotal,
      shipping,
      total
    });

    await order.save();

    // If user is authenticated, clear their cart
    if (req.user) {
      await Cart.findOneAndUpdate(
        { userId: req.user.id },
        { items: [] }
      );
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      orderId: order._id
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  }
};

module.exports = {
  createOrder
};