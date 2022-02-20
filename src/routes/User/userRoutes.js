const express = require("express");
const router = express.Router()

const userManagement = require("../../controllers/mainController").UserManagement

router.get('/users/post/likes', userManagement.getListOfUsersLikedMyPost)

router.get('/all-posts/likes', userManagement.getListOfUsersWhoLikedMyCommentsOnAnyPost)

router.get('/post/commenters', userManagement.listOfUsersCommentingOnMyPost)

module.exports = router