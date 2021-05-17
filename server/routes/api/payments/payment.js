const router = require('express').Router();
const nodeFetch = require('node-fetch');

// pay for order
router.get('/', async (req, res) => { 
    try {

        nodeFetch()
        const orders = await Order.find({});

        res.json({ orders: orders });

    } catch (err){
        res.status(500).json({ message: err.message });
    }
});
