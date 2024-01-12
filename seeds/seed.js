const sequelize = require("../config/connection");
const { User, BlogPost, Comments } = require("../models");

const userData = require("./userData.js");
const blogPostData = require("./blogPostData.js");
const commentsData = require("./commentsData.js");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const blogPost of blogPostData) {
        await BlogPost.create({
            ...blogPost,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    const comments = await Comments.bulkCreate(commentsData);

    process.exit(0);
};

seedDatabase();