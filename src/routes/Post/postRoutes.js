const express = require("express");
const router = express.Router()

const PostManagement = require("../../controllers/mainController").PostManagement

router.post('/post/create', PostManagement.createPost);

router.post('/post/add-comment', PostManagement.createCommentsOnPost);

router.post('/like', PostManagement.addLikeUnlikeOnPostOrComment);

router.patch('/unlike', PostManagement.addLikeUnlikeOnPostOrComment);

module.exports = router;
