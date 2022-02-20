"use strict";

//--------Import Objection Model--------
const Model = require("objection").Model;

class Comments extends Model {
  static get tableName() {
    return "comments";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        id: { type: "integer" },
        post_id: { type: "integer"},
        commenter_id: { type: "integer"},
        comment: { type: "string" }
      },
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      comment_likes_relation: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + "/LikeManagement",
        join: {
          from: "comments.id",
          to: "like_management.comment_id",
        },
      },

      comment_user_relation: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + "/Users",
        join: {
          from: "comments.commenter_id",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = Comments;
