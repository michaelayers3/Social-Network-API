const { Thought, User } = require('../models');

module.exports = {
    //getThoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //getSingleThought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID found' })
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //createThought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({
                    message: 'Video created, but found no user with that ID',
                });
            }
            res.json('Thought created!')
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //updateThought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneandUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({
                    message: 'Thought created, but found no user with that ID',
                });
            }

            res.json(thought)

        } catch (err) {
            res.status(500).json(err);
        }
    },
    //deleteThought
    async deleteThought(req,res) {
        try {
            const thought = await Thought.findOneAndRemove({_id: req.params.thoughtId});
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID found'})
            }

            const user = await User.findOneandUpdate(
                {thoughts: req.params.thoughtId},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true}
            );
            if (!user) {
                return res.status(404).json({message: 'Thought deleted, but no user with that ID found'})
            }
            res.json({ message: 'Begone, thought!'})
        }catch (err) {
            res.status(500).json(err);
        }
    },
    //addReactions
    async addReactions(req,res) {
        try {
            const thought = await Thought.findOneandUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new: true},
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID found'})
            }
            res.json(thought);
        }catch (err) {
            res.status(500).json(err);
        }
    },
    //deleteReactions
    async deleteReactions(req,res) {
        try{
            const thought = await Thought.findOneAndRemove(
                {_id: req.params.thoughtId},
                {$pull: {reactions: {reactionId: req.params.reactionId} }},
                {runValidators: true, new: true},
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID found'})
            }
            res.json(thought);
        }catch (err) {
            res.status(500).json(err);
        }
    }
};