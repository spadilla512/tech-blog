const router = require('express').Router();
const { BlogPost, Comments, User } = require('../../models');

//create comment
router.post("/", async (req, res) => {
    try {
        console.log("New comment created");
        const comments = await Comments.create({
            comments_body: req.body.comments_body,
            BlogPost_id: req.body.blogPost_id,
            user_id: req.session.user_id || req.body.user_id,
        });
        res.status(200).json(comments);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//get comments
router.get("/", async (req, res) => {
    try {
        const commentsData = await Comments.findAll({
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: BlogPost,
                    attributes: ["id"],
                },
            ],
        });
        res.status(200).json(commentsData);
    } catch(err) {
        res.status(500).json(err);
    }
});

//update comment
router.put("/:id", async (req, res) => {
    try {
        const updatedComments = await Comments.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!updatedComments[0]) {
            res.status(400).json({ message: "No comment found" });
            return;
        }
        console.log("Comment updated");
        res.status(200).json(updatedComments);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete comment
router.delete("/:id", async (req, res) => {
    try {
        const comments = await Comments.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!comments) {
            res.status(404).json({ message: "No comment found" });
            return;
        }
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;