"use strict"

const router = require('express').Router()


const { Chains } = require('../controllers/chain');

router.route('/') //admin
    .get(Chains.read)
router.route('/chain')
    .post(Chains.create)
router.route('/:ChainId')
    .get(Chains.update) 
router.route('/:ChainId')
    .delete(Chains.delete) 

module.exports = router