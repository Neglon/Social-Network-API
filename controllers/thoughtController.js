const { Thought, User } = require('../models');


//get all thoughts
const thoughtController = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();

            return res.status(200).json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

//get a single thought
    async getThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            return res.status(200).json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

//create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            
            const user = await User.findByIdAndUpdate(
                req.body.userId,
                { $addToSet: { thoughts: thought._id } },
                { runValidators: true, new: true }
            );
            return res.status(200).json({thought, user});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

//update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { new: true, runValidators: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            return res.status(200).json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },


//delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            return res.status(200).json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },



//create a reaction



//delete a reaction


};

module.exports = thoughtController;