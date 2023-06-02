const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompositionSchema = new Schema({
    proposal_id: {type: String, unique: true},
    patient_id: {type: Number},
    transplants: {type: Number},
    composition: {type: Schema.Types.Mixed}
});

CompositionSchema.index({patient_id: 1, transplants: 1}, {unique: true});

module.exports = mongoose.model('composition', CompositionSchema)