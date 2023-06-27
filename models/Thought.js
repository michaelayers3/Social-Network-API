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
            get: (date) => {
              if (date) return date.toLocaleDateString();
            },
        },
        username: [
            {
                type: String,
                // type: Schema.Types.ObjectId,
                ref: 'user',
                required: true,
            },
        ],
      
        reactions: [Reaction],
    },
    {
      toJSON: {
          getters: true,
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