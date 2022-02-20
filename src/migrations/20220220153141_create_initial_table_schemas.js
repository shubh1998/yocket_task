exports.up = function (knex) {
    return knex.schema
      .createTable("users", (table) => {
        table.increments("id").primary();
        table.string("name", 120);
        table.string("email").unique();
        table.string("mobile");
        table.timestamps(false, true);
      })
  
      .createTable("posts", (table) => {
        table.increments("id").primary();
        table.integer("user_id").references("id").inTable("users");
        table.text("post_description");
        table.timestamps(false, true);
      })
  
      .createTable("comments", (table) => {
        table.increments("id").primary();
        table.integer("post_id").references("id").inTable("posts");
        table.integer("commenter_id").references("id").inTable("users");
        table.text("comment")
        table.timestamps(false, true);
      })
  
      .createTable("like_management", (table) => {
        table.increments("id").primary();
        table.integer("post_id").references("id").inTable("posts");
        table.integer("comment_id").references("id").inTable("comments");
        table.integer("user_id").references("id").inTable("users");
        table.boolean('like').defaultTo(false)
        table.timestamps(false, true);
      })
  };
  
  exports.down = function (knex) {};
  