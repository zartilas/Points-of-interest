const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
    mongoose.connect('mongodb+srv://zartilas:4pEBhBAg00AI63SX@cluster0.eik70.mongodb.net/Cluster0?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => winston.info('MongoDb connected successfuly...'));
}