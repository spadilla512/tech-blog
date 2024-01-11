const User = require("./user");
const BlogPost = require("./blogPost");
const Comments = require("./comments");

User.hasMany(BlogPost, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

BlogPost.belongsTo(User, {
    foreignKey: "user_id",
});

User.hasMany(Comments, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Comments.belongsTo(User, {
    foreignKey: "user_id",
});

Comments.belongsTo(BlogPost, {
    foreignKey: "blogPost_id",
    onDelete: "CASCADE",
});

BlogPost.hasMany(Comments, {
    foreignKey: "blogPost_id",
    onDelete: "CASCADE",
});

module.exports = { User, BlogPost, Comments };