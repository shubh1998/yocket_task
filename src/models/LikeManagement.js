"use strict";

//--------Import Objection Model--------
const Model = require("objection").Model;

class LikeManagement extends Model {
  static get tableName() {
    return "like_management";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        id: { type: "integer" },
        post_id: { type: "integer"},
        comment_id: { type: "integer"},
        user_id: { type: "integer"},
        like: { type: "boolean" }
      },
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      user_relation: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + "/Users",
        join: {
          from: "like_management.user_id",
          to: "users.id",
        },
      },

      post_relation: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + "/Posts",
        join: {
          from: "like_management.post_id",
          to: "posts.id",
        },
      },

      comment_relation: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + "/Comments",
        join: {
          from: "like_management.comment_id",
          to: "comments.id",
        },
      },
    };
  }
}

module.exports = LikeManagement;
