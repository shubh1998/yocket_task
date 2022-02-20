"use strict";

const Model = require("objection").Model;
const validator = require("validator");

class Users extends Model {
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string", minLength: 1, maxLength: 255 },
        mobile: { type: "string", maxLength: 10 },
      },
    };
  }

  static get relationMappings() {
    return {
      user_posts_relation: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + "/Posts",
        join: {
          from: "users.id",
          to: "posts.user_id",
        },
      }
    };
  }

  //---------Function runs before inserting a record----------------------
  async $beforeInsert() {
    await super.$beforeInsert();
    if (this.email) {
      if (!validator.isEmail(this.email || "")) {
        throw badRequestError("Not a valid email address!");
      }
    }
  }
}

module.exports = Users;
