const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: String,
        //unique, required, trimmed
        email: String,
        //unique, required, matched
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,

    }
);

//virtual property here, I think for friends?

const User = model('user', userSchema);

module.exports = User;