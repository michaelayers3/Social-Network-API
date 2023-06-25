const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            minLength: 1,
            maxLength: 280,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //getter method to format the timestamp on query
        },
        username: [
            {
                type: String,
                ref: 'user',
            },
        ],
        userId: [
          {
              type: Schema.Types.ObjectId,
              ref: 'user',
          }
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
  .virtual('totalReactions')
  .get(function () {
    return this.reactions.length;
  });

const Thought = model('thought', thoughtSchema)

module.exports = Thought;