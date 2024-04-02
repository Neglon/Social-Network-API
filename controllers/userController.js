const { User, Thought } = require('../models');


// get all users
const userController = {
    async getUsers(req, res) {
        try {
            const users = await User.find()

            return res.status(200).json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },



//get a single user
    async getUser (req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })

            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            return res.status(200).json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

//create a user
    async createUser (req, res) {
        try {
            const user = await User.create(req.body);

            return res.status(200).json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },


//update a user



//delete a user



};