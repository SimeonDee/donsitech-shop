const Product = require('../../models/Product');
const router = require('express').Router();

// Get products
router.get('/', async (req, res) => { 
    try {
        const products = await Product.find({});

        res.json({ products: products });

    } catch (err){
        res.status(500).json({ message: err.message });
    }
});

// Create a new product
router.post('/', async (req, res) => { 
    try {
        const product = new Product({
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            price: Number.parseFloat(req.body.price),
            available_qty: Number.parseInt(req.body.available_qty),
        });

        const newProduct = await product.save();
        res.status(201).json({ product: newProduct });

    } catch (err){
        res.status(500).json({ message: err.message });
    }
});

// Get a product
router.get('/:id', findProduct, (req, res) => { 
    if(res.product !== null){
        res.json({ product: res.product });
    }
});

// Update a product
router.patch('/:id', findProduct, async (req, res) => { 
    if(req.body.name){
        res.product.name = req.body.name;
    } 

    if(req.body.category){
        res.product.category = req.body.category;
    } 

    if(req.body.description){
        res.product.description = req.body.description;
    } 

    if(req.body.price){
        res.product.price = Number.parseFloat(req.body.price);
    } 

    if(req.body.available_qty){
        res.product.available_qty = Number.parseInt(req.body.available_qty);
    } 

    try {
        const updatedProduct = await res.product.save();
        res.status(201).json({ product: updatedProduct });
    
    } catch (err){
        res.status(400).json({ message: err.message });
    }
});

// Delete a state
router.delete('/:id', findProduct, async (req, res) => { 
    try{
        await res.product.remove();
        res.json({ message: 'Product deleted successfully' });
    
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
    
});

// Middleware
async function findProduct(req, res, next){
    let foundProduct;
    try {
        foundProduct = await Product.findById({ _id: req.params.id });

    } catch (err){
        res.json({ message: err.message });
    }

    if(foundProduct === null){
        res.status(404).json({ message: 'Product not found.'})
    }
    res.product = foundProduct;
    next();
}


module.exports = router;