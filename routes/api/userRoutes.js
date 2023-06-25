const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    getFriends,
    deleteFriends,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser),

router.route('/:userId/friends').post(getFriends);

router.route('/:userId/friends/:friendId')
.delete(deleteFriends);



module.exports = router;