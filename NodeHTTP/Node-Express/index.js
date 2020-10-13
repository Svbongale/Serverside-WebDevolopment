const express = require('express'),
      http = require('http'),
      morgan = require('morgan'),
      bodyParser = require('body-parser');

const dishRouter = require('./routes/dishRouter');

const port = 3000,
      hostname = 'localhost';

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use("/dishes" , dishRouter);



app.get('/dishes/:dishId', (req, res, next) => {
    res.end("will send details of the dish to you" + req.param.dishId);
});


app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403;
    res.end("Post operation not allowed on " + req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
    res.write("updating the dish " + req.params.dishId);
    res.end("Will update the dish- " + req.body.name + "with details" + req.body.description);
});


app.delete('/dishes/:dishId', (req, res, next) => {
    res.end("Deleting the dish " + req.body.dishId);
});

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an express server</h1></body></html>');
});


const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});


