"use strict"

const router = require('express').Router()


const { Chains } = require('../controllers/chain');

router.route('/') 
    .get(Chains.read)
router.route('/chain')
    .post(Chains.create)
router.route('/:ChainId')
    .put(Chains.update) 
router.route('/:ChainId')
    .delete(Chains.delete) 

module.exports = router