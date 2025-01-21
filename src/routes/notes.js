"use strict"

const router = require('express').Router()


const { Notes } = require('../controllers/notes');

router.route('/') //admin
    .get(Notes.read)
router.route('/Note')
    .post(Notes.create)
router.route('/:NoteId')
    .put(Notes.update) 
router.route('/:NoteId')
    .delete(Notes.delete) 

module.exports = router