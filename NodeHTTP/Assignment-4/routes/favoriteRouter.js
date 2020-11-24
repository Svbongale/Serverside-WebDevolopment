const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

const Favorite = require('../models/favorite');
const { json } = require('express');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .get(cors.cors, (req, res, next) =>{
        Favourites.findOne({ user: req.user._id }, (err, fav) => {
            if (err){
                return next(err);
            }
            if(!fav){
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end("You do naot have any favorites");
            }
            
        })
        .populate('user')
        .populate('favoriteDishes')
        .then((favorites) => {
            if(favorites) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            }
        }, (err) => next(err))
        .catch((err) => next(err))
    })
    .post(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) =>{
        Favorites.findOne({id: req.user._id}, (err,fav) => {
            console.log("User id", req.user._id);
            if (err){
                return next(err);
            }
            if(!fav){
                console.log("Adding"+ req.body.dish + "dish to favorites");
                Favorites.create({user: req.user._id})
                .then((favorite)=>{
                    for(var dish = 0; dish < req.body.dish.length; dish++ ){
                        favorite.favoriteDishes.push(req.body.dish[dish]);
                    }
                    favorite.save()
                    .then((favorite)=>{
                        console.log("Favorite dish created successfully");
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorite);
                    });
                }, (err) => next(err))
                .catch((err) => next(err));
            }else {
                for( var dish = 0; dish < req.body.dish.length; dish++ ){
                    if(fav.favoriteDishes.indexOf(req.body.dish[dish])=== 1){
                        fav.favoriteDishes.push(req.body.dish[dish]);
                    }else{
                        alert("Dish is already a favorite dish");
                    }
                }
                fav.save()
                .then((favorite) => {
                    console.log("Favorite dishes created", favorite);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                })
            }
        })
    })
    .put(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on favorites!!!');
        return next(err);
    })
    .delete(cors.corsWithOptions,authenticate.verifyUser, (req, res, next)=>{
        Favorites.remove({user: req.user._id})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    });


    favouriteRouter.route('/:dishId')
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Favourites.findOne({ user: req.user._id }, (err, fav) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            if (!fav) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'plain/text');
                res.end('That dish doesn\'t exist in your favourite dishes!!!')
            }
            if (fav) {
                if (fav.favouriteDishes.indexOf(req.params.dishId) !== -1) // dish found
                {
                    Favourites.findOne({ user: req.user._id })
                        .populate('user')
                        .populate('favouriteDishes')
                        .then((favourite) => {
                            console.log('fav: ', favourite.favouriteDishes.indexOf(req.params.dishId));
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favourite.favouriteDishes);
                        }, (err) => next(err))
                        .catch((err) => next(err));
                } else {
                    var err = new Error('No dish found with Id : ' + req.params.dishId);
                    err.status = 404;
                    return next(err);
                }
            }
        })
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favourites.findOne({ user: req.user._id }, (err, favourite) => {
            if (err) {
                return next(err);
            }
            if (!favourite) {
                Favourites.create({ user: req.user._id })
                    .then((favourite) => {
                        favourite.favouriteDishes.push(req.params.dishId);
                        favourite.save()
                            .then((favourite) => {
                                console.log('\nFavourite Created: ', favourite);
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(favourite);
                            })
                    }, (err) => next(err))
                    .catch((err) => next(err));
            } else {
                console.log(favourite);
                if (favourite.favouriteDishes.indexOf(req.params.dishId) < 0) {
                    favourite.favouriteDishes.push(req.params.dishId);
                    favourite.save()
                        .then((favourite) => {
                            console.log('\nFavourite Created: ', favourite);
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favourite);
                        })
                } else {
                    res.statusCode = 403;
                    res.setHeader('Content-Type', 'plain/text');
                    res.end('Favourite already exists');
                }
            }
        });
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        var err = new Error('PUT operation not supported on /favourites/' + req.params.dishId);
        err.status = 403;
        return next(err);
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favourites.findOne({ user: req.user._id }, (err, fav) => {
            console.log('Fav: ', fav);
            if (err) {
                return next(err);
            }
            if (!fav) {
                res.statusCode = 403;
                res.setHeader('Content-Type', 'plain/text');
                res.end('Favourite dish does not exist!!!');
            }
            if (fav.favouriteDishes.indexOf(req.params.dishId) !== -1) { 
                fav.favouriteDishes.splice(req.params.dishId, 1);
                fav.save()
                    .then((resp) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(resp);
                    }, (err) => next(err))
                    .catch((err) => next(err));
            } else {
                var err = new Error('No such dish found in your favourite dishes!!');
                err.status = 404;
                return next(err);
            }
        });
    });


module.exports = favouriteRouter;

