// Modules
const Mongoose = require('mongoose');

module.exports = Mongoose.model('Settings', new Mongoose.Schema({
    theme: {
        required: true,
        type: String
    },
    username: {
        index: {
            unique: true
        },
        required: true,
        type: String
    }
}));
