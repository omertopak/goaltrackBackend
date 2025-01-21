"use strict"

const router = require('express').Router()

// Call Controllers:
const { User } = require('../controllers/user');

// router.route('/') //admin
//     .get(User.list)
router.route('/register')
    .post(User.create)
// router.route('/:userId')
    // .get(User.read) //herkes
    .delete(User.delete) //user


module.exports = router