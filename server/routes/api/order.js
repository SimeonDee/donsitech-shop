const Order = require('../../models/Order');
const router = require('express').Router();

// Get all orders
router.get('/', async (req, res) => { 
    try {
        const orders = await Order.find({});

        res.json({ orders: orders });

    } catch (err){
        res.status(500).json({ message: err.message });
    }
});

// Create a new order
router.post('/', async (req, res) => { 
    try {
        const order = new Order({
            username: req.body.username,
            products: req.body.products,
            shipping_cost: Number.parseFloat(req.body.shipping_cost),
            tax: Number.parseFloat(req.body.tax),
            total_cost: Number.parseInt(req.body.total_cost),
            order_date: Date.now,
        });

        const newOrder = await order.save();
        res.status(201).json({ order: newOrder });

    } catch (err){
        res.status(500).json({ message: err.message });
    }
});

// Get an order
router.get('/:id', findOrder, (req, res) => { 
    if(res.order !== null){
        res.json({ order: res.order });
    }
});

// Update an order
router.patch('/:id', findOrder, async (req, res) => { 
    if(req.body.username){
        res.order.username = req.body.username;
    } 

    if(req.body.products){
        res.order.products = req.body.products;
    } 

    if(req.body.shipping_cost){
        res.order.shipping_cost = Number.parseFloat(req.body.shipping_cost);
    } 

    if(req.body.tax){
        res.order.tax = Number.parseFloat(req.body.tax);
    } 

    if(req.body.total_cost){
        res.order.total_cost = Number.parseFloat(req.body.total_cost);
    } 

    if(req.body.order_date){
        res.order.order_date = new Date(req.body.order_date);
    } 

    try {
        const updatedOrder = await res.order.save();
        res.status(201).json({ order: updatedOrder });
    
    } catch (err){
        res.status(400).json({ message: err.message });
    }
});

// Delete an order
router.delete('/:id', findOrder, async (req, res) => { 
    try{
        await res.order.remove();
        res.json({ message: 'Order deleted successfully' });
    
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
    
});

// Middleware
async function findOrder(req, res, next){
    let foundOrder;
    try {
        foundOrder = await Order.findById({ _id: req.params.id });

    } catch (err){
        res.json({ message: err.message });
    }

    if(foundOrder === null){
        res.status(404).json({ message: 'Order not found.'})
    }
    res.order = foundOrder;
    next();
}


module.exports = router;