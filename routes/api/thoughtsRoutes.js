const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought, 
    updateThought,
    deleteThought,
    addReactions,
    deleteReactions,
} = require('../../controllers/thoughtController')

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReactions);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReactions);

module.exports = router;