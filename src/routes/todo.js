"use strict"

const router = require('express').Router()


const { Todo } = require('../controllers/todo');

router.route('/') //admin
    .get(Todo.read)
router.route('/todo')
    .post(Todo.create)
router.route('/:TodoId')
    .delete(Todo.delete) 
router.route('/:TodoId')
    .put(Todo.done) 
// router.route('/:TodoId/status')
//     .put(Todo.status) 
router.route('/:TodoId/priority')
    .put(Todo.priority) 


module.exports = router