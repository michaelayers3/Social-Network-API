const User = require('../models/User');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }

    },
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json({message: 'User successfully deleted!'});
        } catch (err) {
            res.status(500).json(err)
        }
    },

    ///probably need to tweak this, might need to make a new 'friend' variable

    async getFriends(req,res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {friends: req.body}},
                {runValidators: true, new: true}
            );
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteFriends(req, res) {
        try {
            const user = await User.findOneandDelete(
                {_id: req.params.userId},
                {$pull: {friends: req.params.userId}},
                {runValidators: true, new: true}
            );
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
        } catch (err) {
            res.status(500).json(err)
        }
    },
}