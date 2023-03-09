const express = require('express');
const { Router } = require('express');
const { User, Post, Comment } = require('../../models');

const router = Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get specific user
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findOne({
      attributes: { exclude: ['password'] },
      where: { id: req.params.id },
      include: [
        { model: Post, attributes: ['id', 'title', 'content', 'created_at'] },
        { model: Comment, attributes: ['id', 'comment_text', 'created_at'], include: { model: Post, attributes: ['title'] } }
      ]
    });
    if (!userData) res.status(404).json({ message: 'No user found with this id' });
    else res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create a user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({ username: req.body.username, password: req.body.password });
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
      res.json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });
    if (!userData) res.status(400).json({ message: 'No user with that username!' });
    else {
      const validPassword = userData.checkPassword(req.body.password);
      if (!validPassword) res.status(400).json({ message: 'Incorrect password!' });
      else {
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.username = userData.username;
          req.session.loggedIn = true;
          res.json({ user: userData, message: 'You are now logged in!' });
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// User logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) req.session.destroy(() => res.status(204).end());
  else res.status(404).end();
});

module.exports = router;
