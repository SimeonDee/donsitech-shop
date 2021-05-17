const User = require('../../models/User');
const router = require('express').Router();

// Get users
router.get('/', async (req, res) => { 
    try {
        const users = await User.find({});

        res.json({ users: users });

    } catch (err){
        res.status(500).json({ message: err.message });
    }
});

// Create a new user
router.post('/', async (req, res) => { 
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            state: req.body.state,
        });

        const newUser = await user.save();
        res.status(201).json({ user: newUser });

    } catch (err){
        res.status(500).json({ message: err.message });
    }
});

// Get a user
router.get('/:id', findUser, (req, res) => { 
    if(res.user !== null){
        res.json({ user: res.user });
    }
});

// Update a state
router.patch('/:id', findUser, async (req, res) => { 
    if(req.body.username){
        res.user.username = req.body.username;
    } else{
        res.status(400).json({ message: 'Sorry, username is required.' });
    }

    if(req.body.password){
        res.user.password = req.body.password;
    } else{
        res.status(400).json({ message: 'Sorry, password is required.' });
    }

    if(req.body.state){
        res.user.state = req.body.state;
    } else{
        res.status(400).json({ message: 'Sorry, state is required.' });
    }

    try {
        const updatedUser = await res.user.save();
        res.status(201).json({ user: updatedUser });
    
    } catch (err){
        res.status(500).json({ message: err.message });
    }
});

// Delete a state
router.delete('/:id', findUser, async (req, res) => { 
    try{
        await res.user.remove();
        res.json({ message: 'User deleted successfully' });
    
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
    
});



// Middleware
async function findUser(req, res, next){
    let foundUser;
    try {
        foundUser = await User.findById({ _id: req.params.id });

    } catch (err){
        res.json({ message: err.message });
    }

    if(foundUser === null){
        res.status(404).json({ message: 'User not found.'})
    }
    res.user = foundUser;
    next();
}


module.exports = router;