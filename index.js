const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./startup/config');
const winston = require('winston');
const err = require('./middleware/errors');
const userRoutes = require('./routes/user-routes');
const pointRoutes = require('./routes/point-routes');
const app = express();

require('./startup/database')();
require('./startup/logging')();
require('./startup/validations')();

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoutes.routes);
app.use(pointRoutes.routes);
app.use(err);

app.get('/', (req, res)=>{
res.render('home'); });

//Middleware Test
app.use((req,res,next)=>{
    console.log("Hi my Friend, I am your middleware!")
    next();
});

app.listen(config.port, () => winston.info('App is listening on url http://localhost:' + config.port));