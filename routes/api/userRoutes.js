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


router.route('/:userId/friends/:friendId')
.post(getFriends)
.delete(deleteFriends);



module.exports = router;