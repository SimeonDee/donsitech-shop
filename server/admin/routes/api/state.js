const StateModel = require('../../models/Naija.States');
const router = require('express').Router();

// Get States
router.get('/', async (req, res) => { 
    try {
        const states = await StateModel.find({});

        res.json({ states: states });

    } catch (err){
        res.status(500).json({ message: err.message });
    }
});

// Create State
router.post('/', async (req, res) => { 
    try {
        const state = new StateModel({
            name: req.body.name,
        });

        newState = await state.save();
        res.status(201).json({ state: newState });

    } catch (err){
        res.status(500).json({ message: err.message });
    }
});

// Get a state
router.get('/:id', findState, (req, res) => { 
    if(res.state !== null){
        res.json({ state: res.state });
    }
});

// Update a state
router.patch('/:id', findState, async (req, res) => { 
    if(req.body.name){
        res.state.name = req.body.name;
    } else{
        res.status(400).json({ message: 'Sorry, state name is required.' });
    }

    try {
        const updatedState = await res.state.save();
        res.status(201).json({ state: updatedState });
    
    } catch (err){
        res.status(500).json({ message: err.message });
    }
});

// Delete a state
router.delete('/:id', findState, async (req, res) => { 
    try{
        await res.state.remove();
        res.json({ message: 'State deleted successfully' });
    
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
    
});



// Middleware
async function findState(req, res, next){
    let foundState;
    try {
        foundState = await StateModel.findById({ _id: req.params.id });

    } catch (err){
        res.json({ message: err.message });
    }

    if(foundState === null){
        res.status(404).json({ message: 'State not found.'})
    }
    res.state = foundState;
    next();
}


module.exports = router;