// Import necessary modules and models
const router = require('express').Router(); // Import Router from express
const { User, Post, Comment } = require('../../models'); // Import models
const withAuth = require('../../utils/auth'); // Import auth middleware

// Get all posts
router.get("/", (req, res) => {
    Post.findAll({ // Find all posts
        attributes: ["id", "content", "title", "created_at"], // Specify which attributes to include
        order: [["created_at", "DESC"]], // Order by created_at in descending order
        include: [ // Include related models
            {
                model: User, // Include the User model
                attributes: ["username"], // Only include the username attribute
            },
            {
                model: Comment, // Include the Comment model
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"], // Specify which attributes to include
                include: { // Include the User model for comments
                    model: User,
                    attributes: ["username"], // Only include the username attribute
                },
            },
        ],
    })
    .then((PostData) => res.json(PostData)) // Return post data as JSON
    .catch((err) => {
        console.log(err);
        res.status(500).json(err); // Return error as JSON with status code 500
    });
});

// Get a single post
router.get("/:id", (req, res) => {
    Post.findOne({ // Find a single post
        where: {
            id: req.params.id, // Find by id parameter in request URL
        },
        attributes: ["id", "content", "title", "created_at"], // Specify which attributes to include
        include: [ // Include related models
            {
                model: User, // Include the User model
                attributes: ["username"], // Only include the username attribute
            },
            {
                model: Comment, // Include the Comment model
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"], // Specify which attributes to include
                include: { // Include the User model for comments
                    model: User,
                    attributes: ["username"], // Only include the username attribute
                },
            },
        ],
    })
    .then((PostData) => {
        if (!PostData) { // If no post is found, return 404 error
            res.status(404).json({
                message: "No post found with this id"
            });
            return;
        }
        res.json(PostData); // Return post data as JSON
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err); // Return error as JSON with status code 500
    });
});

// Create a post
router.post("/", withAuth, (req, res) => {
    console.log("creating");
    Post.create({ // Create a new post
        title: req.body.title,
        content: req.body.post_content,
        user_id: req.session.user_id // Set user_id to the currently logged in user
    })
    .then((PostData) => res.json(PostData)) // Return post data as JSON
    .catch((err) => {
        console.log(err);
        res.status(500).json(err); // Return error as JSON with status code 500
    });
});

// This is a router for updating and deleting posts, which requires authentication.

// This is a router for updating and deleting posts, which requires authentication.

// Update a post:
router.put("/:id", withAuth, (req, res) => {
    // Extract title and content from the request body
    // and use Sequelize's update method to update the corresponding post in the database
    Post.update(
      {
        title: req.body.title,
        content: req.body.post_content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((PostData) => {
        if (!PostData) {
          // If no post with the given id is found in the database, send a 404 error response
          res.status(404).json({
            message: "No post found with this id",
          });
          return;
        }
        // If the update is successful, send a JSON response with the updated post data
        res.json(PostData);
      })
      .catch((err) => {
        // If any error occurs, send a 500 error response
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  //Delete a post:
  router.delete("/:id", withAuth, (req, res) => {
    // Use Sequelize's destroy method to remove the post from the database
    Post.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((PostData) => {
        if (!PostData) {
          // If no post with the given id is found in the database, send a 404 error response
          res.status(404).json({
            message: "No post found with this id",
          });
          return;
        }
        // If the deletion is successful, send a JSON response with the deleted post data
        res.json(PostData);
      })
      .catch((err) => {
        // If any error occurs, send a 500 error response
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  module.exports = router;
  