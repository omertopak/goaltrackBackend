"use strict"

const router = require('express').Router()


const { Event } = require('../controllers/event');

router.route('/') //admin
    .get(Event.read)
router.route('/event')
    .post(Event.create)
router.route('/:EventId')
    .put(Event.update) 
router.route('/:EventId')
    .delete(Event.delete) 

module.exports = router