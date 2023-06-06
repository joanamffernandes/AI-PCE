const {v4: uuidv4} = require('uuid');
let CompositionSchema = require('../model/composition');

module.exports.newComposition = async (patient_id, transplants, composition) => {
    try {
        let resp = await validateTransplants(0, patient_id, transplants);
        if (!resp.success) {
            return resp;
        }
        let comp = await CompositionSchema({
            proposal_id: uuidv4(),
            patient_id: patient_id,
            transplants: transplants,
            composition: composition
        });
        let response = await comp.save();
        return {success: true, response: response};
    } catch (err) {
        console.log(err);
        return {success: false, response: err.message}
    }
}

/**
 * Retorna o número de transplantes de um paciente.
 * Caso não exista devolve -1
 */
async function getNumberOfTransplants(patient_id) {
    const maxTransplants = await CompositionSchema
        .find({patient_id: patient_id})
        .sort({transplants: -1})
        .select('transplants')
        .limit(1);

    return maxTransplants.length ? maxTransplants[0].transplants : -1;
}


async function validateTransplants(proposal_id, patient_id, transplants) {
    const max = await getNumberOfTransplants(patient_id);

    if (max > 0 && transplants <= max) {
        return {
            success: false,
            response: "O número de transplantes não é válido. O paciente já tem " + max +
                " transplantes registrados. Por favor, insira um valor superior."
        };
    }
    return {success: true};
}

/**
 * Retorna o número de transplantes de um paciente.
 * Caso não exista devolve -1
 */
module.exports.getNumberOfTransplants = async (patient_id) => {
    return await getNumberOfTransplants(patient_id);

}
module.exports.listAll = async () => {
    try {
        let compositions = await CompositionSchema.find().sort({patient_id: 'asc'});
        return {success: true, response: compositions};
    } catch (err) {
        console.log(err);
        return {success: false, response: 'Error listing all proposals. Reason:  ' + err.message};
    }
}

module.exports.getProposal = async (proposal_id) => {
    try {
        let proposal = await CompositionSchema.findOne({proposal_id: proposal_id});
        return {success: true, response: proposal};
    } catch (err) {
        console.log(err);
        return {success: false, response: 'Error loading the proposal". Reason:  ' + err.message};
    }
}


module.exports.updateComposition = async (proposal_id, patient_id, transplants, composition) => {

    try {
        let proposal = await CompositionSchema.findOneAndUpdate({proposal_id: proposal_id}, {composition: composition}, {new: true});
        return {success: true, response: proposal};
    } catch (err) {
        console.log(err);
        return {success: false, response: err.message};
    }
}

