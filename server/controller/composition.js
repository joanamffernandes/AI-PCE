let CompositionSchema = require('../model/composition');

module.exports.newComposition = async (erh_id, composition) => {
    try {
        let comp = await CompositionSchema({erh_id: erh_id, composition: composition});
        let response = await comp.save();
        return {success: true, response: response};
    } catch (err) {
        console.log(err);
        return {success: false, response: err}
    }
}

module.exports.listComposition = async () => {
    try {
        return await CompositionSchema.find();
    } catch (err) {
        console.log(err);
        throw new Error('Error listing all users. Reason:  ' + err.message);
    }
}

module.exports.getByID = async (erh_id) => {
    try {
        return await CompositionSchema.findOne({erh_id: id});
    } catch (err) {
        console.log(err);
        throw new Error('Error getting erh_id "' + erh_id + '". Reason:  ' + err.message);
    }
}