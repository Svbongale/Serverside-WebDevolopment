const express = require('express'),
      bodyParser = require('body-parser');


const dishRouter = express.Router();


dishRouter.use(bodyParser.json());



dishRouter.route('/').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req, res, next) => {
    res.end("will send all the dishes to you");
})

.post((req, res, next) => {
    res.end("will add dish: " + req.body.name + " with details " + req.body.description );
})

.put((req, res, next) => {
    res.end("Put operation not supported");
    res.statusCode = 403;
})

.delete((req, res, next) => {
    res.end("Deleting all items");
});


module.exports = dishRouter;