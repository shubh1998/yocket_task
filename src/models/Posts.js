"use strict";

//--------Import Objection Model--------
const Model = require("objection").Model;

class Posts extends Model {
  static get tableName() {
    return "posts";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        id: { type: "integer" },
        user_id: { type: "integer"},
        post_description: { type: "string" }
      },
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      post_likes_relation: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + "/LikeManagement",
        join: {
          from: "posts.id",
          to: "like_management.post_id",
        },
      },
      post_comments_relation: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + "/Comments",
        join: {
          from: "posts.id",
          to: "comments.post_id",
        },
      },
    };
  }
}

module.exports = Posts;
