const router = require('express').Router();
const { BlogPost, User, Comments } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
            model: Comments,
            attributes: ["comments_body"],
        },
      ],
    });
    const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));

    res.render('homepage', { 
      blogPosts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogPost/:id', withAuth, async (req, res) => {
    try {
      const blogPostData = await BlogPost.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
            model: Comments,
            include: [User],
          },
        ],
      });
  
      const blogPost = blogPostData.get({ plain: true });
  
      res.render('blogPost', {
        ...blogPost,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [
            { 
                model: BlogPost,
                include: [User],
            },
            {
                model: Comments,
            },
        ],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

  //create new post
router.get("/create", async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.render("create", {
                logged_in: req.session.logged_in,
                userId: req.session.user_id,
            });
            return;
        } else {
            res.redirect("/login");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

  //route to edit post
router.get("/create/:id", async (req, res) => {
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
                {
                    model: Comments,
                    include: [User],
                },
            ],
        });
        const blogPost = blogPostData.get({ plain: true });
        console.log(blogPost);

        if (req.session.logged_in) {
            res.render("edit", {
                ...blogPost,
                logged_in: req.session.logged_in,
                userId: req.session.user_id,
            });
            return;
        } else {
            res.redirect("/login");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.all('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
});

module.exports = router;