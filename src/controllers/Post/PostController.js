"user strict"

const Posts = require("../../models/Posts")
const Comments = require("../../models/Comments")
const LikeManagement = require("../../models/LikeManagement")

const createPost = async (req, res) => {
    try {
        let requestData = req.body

        if (!requestData.user_id) throw badRequestError(res, "Please pass user_id !");
        if (!requestData.post_description) throw badRequestError(res, "Please pass post_description !");

        const createdPost = await Posts.query()
            .insert(requestData)
            .returning("*");


        return createdResponse(res, createdPost, "Post created successfully !");
    } catch (error) {
        throw badRequestError(res, "Something went wrong !");
    }
}

const createCommentsOnPost = async (req, res) => {
    try {
        let requestData = req.body

        if (!requestData.commenter_id) throw badRequestError(res, "Please pass commenter_id !");
        if (!requestData.post_id) throw badRequestError(res, "Please pass post_id !");
        if (!requestData.comment) throw badRequestError(res, "Please pass comment !");

        const createdPostComment = await Comments.query()
            .insert(requestData)
            .returning("*");


        return createdResponse(res, createdPostComment, "Comment added successfully on post!");
    } catch (error) {
        throw badRequestError(res, "Something went wrong !");
    }
}

const addLikeUnlikeOnPostOrComment = async (req, res) => {
    try {
        let requestData = req.body

        if (!requestData.type) throw badRequestError(res, "Please pass type POST or COMMENT !");
        if (requestData.like !== true && requestData.like !== false) throw badRequestError(res, "Please pass like value as boolean !");
        if (!requestData.user_id) throw badRequestError(res, "Please pass user_id !");

        if (requestData.type === "POST") {
            if (!requestData.post_id) throw badRequestError(res, "Please pass post_id !");

            let PostExist = await LikeManagement.query()
                .where({ post_id: requestData.post_id, user_id: requestData.user_id })
                .returning("*").first();

            if (PostExist && (requestData.like === true || requestData.like === false)) {
                result = await LikeManagement.query()
                    .patch({"like": requestData.like})
                    .where({
                        "user_id": requestData.user_id,
                        "post_id": requestData.post_id
                    })
                    .returning("*");
                return okResponse(res, result, `POST ${requestData.like ? "Liked" : "Unliked"} successfully !`);
            } else if (!PostExist && requestData.like === true) {
                delete requestData.type
                result = await LikeManagement.query()
                    .insert(requestData)
                    .returning("*");
                return okResponse(res, result, "POST Liked successfully !");
            } else {
                throw badRequestError(res, "ERROR: You are trying to unlike the post before liking it !")
            }
        } else if (requestData.type === "COMMENT") {
            if (!requestData.comment_id) throw badRequestError(res, "Please pass comment_id !");

            let CommentExist = await LikeManagement.query()
                .where({ comment_id: requestData.comment_id, user_id: requestData.user_id })
                .returning("*").first();

            if (CommentExist && (requestData.like === true || requestData.like === false)) {
                result = await LikeManagement.query()
                    .patch({"like": requestData.like})
                    .where({
                        "user_id": requestData.user_id,
                        "comment_id": requestData.comment_id
                    })
                    .returning("*");
                return okResponse(res, result, `COMMENT ${requestData.like ? "Liked" : "Unliked"} successfully !`);
            } else if (!CommentExist && requestData.like === true) {
                delete requestData.type
                result = await LikeManagement.query()
                    .insert(requestData)
                    .returning("*");
                return okResponse(res, result, "COMMENT Liked successfully !");
            } else {
                throw badRequestError(res, "ERROR: You are trying to unlike the comment before liking it !")
            }

        } else {
            throw badRequestError(res, "Please pass valid type !");
        }

    } catch (error) {
        throw badRequestError(res, "Something went wrong !");
    }
}

module.exports = {
    createPost,
    createCommentsOnPost,
    addLikeUnlikeOnPostOrComment
}