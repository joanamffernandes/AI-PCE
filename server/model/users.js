var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    user_id: {type: Number, unique: true},
    username: {type: String, unique: true},
    password: {type: String},
    first_name: {type: String},
    last_name: {type: String},
    email: {type: String},
    blocked: {type: Number, default: 0},
    active: {type: Number, default: 1}
})

module.exports = mongoose.model('user', UserSchema)