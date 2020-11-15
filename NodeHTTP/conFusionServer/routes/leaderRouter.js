const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const leaderRouter = express.Router();
const authenticate = require('../authenticate');

const Leaders = require('../models/leaders');

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')

    .get((req, res, next) => {
        Leaders.find({})
        .then((leader) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
       Leaders.create(req.body)
       .then((leader) => {
            console.log("Leader created", leader);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
       }, (err) => next(err))
       .catch((err) => next(err));

    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on leaders!!!');
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Leaders.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    });

// // With params

leaderRouter.route('/:leaderID')

    .get((req, res, next) => {
        
        Leaders.findById(req.params.leaderID)
        .then((leader) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .post(authenticate.verifyUser,(req, res, next) => {
        res.end('POST operation not supported on leader with ID!!!');
    })
    .put(authenticate.verifyUser,(req, res, next) => {
        Leaders.findByIdAndUpdate(req.params.leaderID, {
            $set : req.body
        }, { new: true})
        .then((leader) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .delete(authenticate.verifyUser,(req, res, next) => {
        Leaders.findByIdAndRemove(req.params.leaderID)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    });


module.exports = leaderRouter;