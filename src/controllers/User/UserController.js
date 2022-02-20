"user strict"

const Users = require("../../models/Users");

const getListOfUsersLikedMyPost = async (req, res) => {
    try {
        if (!req.query.user_id) throw badRequestError(res, "Please pass query string user_id !");
        if (!req.query.post_id) throw badRequestError(res, "Please pass query string post_id !");

        const usersList = await Users.query()
            .select("id")
            .where("id", req.query.user_id)
            .eager("user_posts_relation")
            .modifyEager("user_posts_relation", (builder) => {
                return builder
                    .select("posts.id")
                    .where("posts.id", req.query.post_id)
                    .eager("post_likes_relation")
                    .modifyEager("post_likes_relation", (builder) => {
                        return builder
                            .select("user_id", "like")
                            .where("like", true)
                            .eager("user_relation")
                            .where({ "post_id": req.query.post_id, "comment_id": null })
                            .orderBy("created_at", "desc");
                    });
            }).first()

        // list Of Users Liked My Post
        const list = usersList?.user_posts_relation[0]?.post_likes_relation.map(item => item.user_relation) || []

        return okResponse(res, list, "Successfully fetched the list of users liking my posts !");
    } catch (error) {
        throw badRequestError(res, "Something went wrong !");
    }
}

const getListOfUsersWhoLikedMyCommentsOnAnyPost = async (req, res) => {
    try {
        if (!req.query.user_id) throw badRequestError(res, "Please pass query string user_id !");

        const usersList = await Users.query()
            .select("id", "name")
            .where("id", req.query.user_id)
            .eager("user_posts_relation")
            .modifyEager("user_posts_relation", (builder) => {
                return builder
                    .select("posts.post_description")
                    .eager("post_comments_relation")
                    .modifyEager("post_comments_relation", (builder) => {
                        return builder
                            .select("id", "comment")
                            .eager("comment_likes_relation")
                            .modifyEager("comment_likes_relation", builder => {
                                builder.select("comment_id").where("like", true).eager("user_relation").modifyEager("user_relation", builder => {
                                    return builder.select("name", "email")
                                })
                            })
                    });
            }).first() || {}

        return okResponse(res, usersList, "Successfully fetch the latest list of users liking my comments on any post !");
    } catch (error) {
        throw badRequestError(res, "Something went wrong !");
    }
}

const listOfUsersCommentingOnMyPost = async (req, res) => {
    try {
        if(!req.query.user_id) throw badRequestError(res, "Please pass query string user_id !");
        if(!req.query.post_id) throw badRequestError(res, "Please pass query string post_id !");

        const usersList = await Users.query()
            .select("id", "name")
            .where("id", req.query.user_id)
            .eager("user_posts_relation")
            .modifyEager("user_posts_relation", (builder) => {
                return builder
                    .select("posts.id", "posts.post_description")
                    .where("posts.id", req.query.post_id)
                    .eager("post_comments_relation")
                    .modifyEager("post_comments_relation", (builder) => {
                        return builder
                            .select("id", "commenter_id", "post_id", "comment")
                            .eager("comment_user_relation")
                            .modifyEager("comment_user_relation", builder => {
                                builder.select("name", "email")
                            })
                    });
            }).first()

        const result = usersList?.user_posts_relation[0]?.post_comments_relation.map(item => ({
            comment: item.comment,
            name: item.comment_user_relation.name,
            email: item.comment_user_relation.email
        })) || []

        return okResponse(res, result, "Successfully fetched list of users commenting on my post !");
    } catch (error) {
        throw badRequestError(res, "Something went wrong !");
    }
}

module.exports = {
    getListOfUsersLikedMyPost,
    getListOfUsersWhoLikedMyCommentsOnAnyPost,
    listOfUsersCommentingOnMyPost
}