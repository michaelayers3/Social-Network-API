const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            minLength: 1,
            maxLength: 280
            //require
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //getter method to format the timestamp on query
        },
        username: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
        reactions: [Reaction],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
);

thoughtSchema
  .virtual('getReactions')
  .get(function () {
    return this.reactions.length;
  });

const Thought = model('thought', thoughtSchema)

module.exports = Thought;