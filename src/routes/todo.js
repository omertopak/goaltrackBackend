"use strict"

const router = require('express').Router()

// Call Controllers:
const { Todo } = require('../controllers/todo');

router.route('/') //admin
    .get(Todo.list)
router.route('/register')
    .post(Todo.create)
router.route('/:TodoId')
    .delete(Todo.delete) 


module.exports = router