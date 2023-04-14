const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompositionSchema = new Schema({
    erh_id: {type: String, unique: true},
    composition: {type: Schema.Types.Mixed}
});

module.exports = mongoose.model('composition', CompositionSchema)