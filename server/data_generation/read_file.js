const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');
const express = require("express");
const uri = "mongodb://localhost:9000/database";

mongoose.set('strictQuery', true);
mongoose.connect(uri)
    .then(() => console.log('Connected.'))
    .catch(() => console.log('Error connecting to MongoDB.'))

const CompositionController = require('../controller/composition');
const template = JSON.parse(fs.readFileSync('template_composition.json'));

ANESTESIA = {0: 'Não', 1: 'Sim'}
GENDER = {
    'Feminino': {
        "code": "at0018",
        "text": "Female"
    },
    'Masculino': {
        "code": "at0019",
        "text": "Male"
    }
};
DIFFICULTY = {
    2: {"code": "3", "text": "High"},
    1: {"code": "2", "text": "Medium"},
    0: {"code": "1", "text": "Low"}
};
COMPLICATION = {
    2: {"code": "3", "text": "High"},
    1: {"code": "2", "text": "Medium"},
    0: {"code": "1", "text": "Low"}
};

LATERALIDADE = {'Esquerdo': {"code": "at0003", "text": "Left"}, 'Direito': {"code": "at0004", "text": "Right"}}
PRIORITY = {
    2: {"code": "at0136", "text": "Emergency"},
    1: {"code": "at0137", "text": "Urgent"},
    0: {"code": "at0138", "text": "Routine"}
};

PROCEDURE_TYPE = {
    'Transplante de Córnea Lamelar Posterior (Endotelial)': {
        "code": "DMEK",
        "text": "Descemet's Membrane Endothelial Keratoplasty (DMEK)"
    },
    'Transplante de Córnea Total (Queratoplastia)': {
        "code": "DALK",
        "text": "Deep Anterior Lamellar Keratoplasty (DALK)"
    },
    'Transplante de Córnea Lamelar Anterior': {
        "code": "BOWMAN",
        "text": "Deep anterior Bowman layer (BL) transplantation (BOWMAN)"
    },
    'Transplante de Córnea Límbico': {
        "code": "DSAEK",
        "text": "Descemet stripping endothelial keratoplasty (DSAEK)"
    }
};

STATUS = {
    'Transplantado': {
        "code": "completed",
        "text": "Procedure completed"
    },
    'Desistência': {
        "code": "cancelled",
        "text": "Procedure cancelled"
    },
    'Contra indicação definitiva': {
        "code": "aborted",
        "text": "Procedure aborted"
    },
    'Contra indicação temporária': {
        "code": "postponed",
        "text": "Procedure postponed"
    },
    'Morte': {
        "code": "aborted",
        "text": "Procedure aborted"
    },
}

C = {
    id_paciente: 0,
    ID_DOENTE: 1,
    DES_DIAGBASE: 2,
    DES_PROCIR: 3,
    LOC_PROC: 4,
    CON_ANEST: 5,
    PRIORIDADE: 6,
    DATA_PROPOSTA: 7,
    DATA_REGISTO: 8,
    DATA_CONSULTA: 9,
    DATA_FECHO: 10,
    MOT_SAIDA: 11,
    cod_postal: 12,
    data_nascimento: 13,
    genero: 14,
    id_paciente_2: 15,
    nome: 16,
    localidade: 17,
    DES_DIAGBASE_REPL: 18,
}

function readfile(filename) {
    const fileRead = fs.readFileSync(path.resolve(__dirname, filename));
    lines = fileRead.toString().split('\n');
    lines.splice(0, 1);
    return lines;
}

DIAGNOSTICO = {}

async function readDiagnostico(filename) {
    let lines = readfile(filename);
    for (let line of lines) {
        let columns = line.replace("\r", "").split(";");
        DIAGNOSTICO[columns[3]] = {"code": columns[1], "text": columns[2]}
    }
}

async function readDoentes(filename) {

    let lines = readfile(filename);
    let id = 1;
    for (let line of lines) {
        id++;
        let columns = line.replace("\r", "").split(";"),
            patient_id = columns[C.id_paciente],
            composition = JSON.stringify(template);

        // obter o número de transplantes e incrementar +1
        const transplants = await CompositionController.getNumberOfTransplants(patient_id) + 1;
        if (!DIAGNOSTICO[columns[C.DES_DIAGBASE_REPL]]) {
            console.log("Sem diagnostico [" + columns[C.DES_DIAGBASE_REPL] + "] para o paciente: " + patient_id + ".");
            continue;
        }
        if (!GENDER[columns[C.genero]]) {
            console.log("Sem genero [" + GENDER[columns[C.genero]] + "] para o paciente: " + patient_id + ".");
            continue;
        }
        const record = generate_composition(columns, transplants);

        for (const [key, value] of Object.entries(record)) {
            composition = composition.replace('${' + key + '}', value);
        }
        const proposal = await CompositionController.newComposition(patient_id, transplants, JSON.parse(composition))
        if (!proposal.success) {
            console.log(proposal.response);
        }
    }
    console.log("Leitura do ficheiro " + filename + " concluída!");
}


function generate_composition(columns, transplants) {
    let anestesia = columns[C.CON_ANEST] === "1";
    return {
        PATIENT_NAME: columns[C.nome],
        PATIENT_ID: columns[C.id_paciente],
        BIRTH_DATE: columns[C.data_nascimento],
        BIRTH_TIME: '00:00',
        ADDRESS_LINE: 'Rua central nº' + columns[C.id_paciente],
        TOWN: columns[C.localidade],
        DISTRICT: columns[C.localidade],
        POSTAL_CODE: columns[C.cod_postal],
        COUNTRY: "Portugal",
        GENDER_CODE: GENDER[columns[C.genero]].code,
        GENDER_TEXT: GENDER[columns[C.genero]].text,
        DIAGNOSIS_CODE: DIAGNOSTICO[columns[C.DES_DIAGBASE_REPL]].code,
        DIAGNOSIS_TEXT: DIAGNOSTICO[columns[C.DES_DIAGBASE_REPL]].text,
        PRIORITY_CODE: PRIORITY[columns[C.PRIORIDADE]].code,
        PRIORITY_TEXT: PRIORITY[columns[C.PRIORIDADE]].text,
        REGISTRATION_DATE: columns[C.DATA_REGISTO],
        REGISTRATION_TIME: '00:00',
        SERVICE_DUE_DATE: '',
        SERVICE_DUE_TIME: '',
        SERVICE_REQUEST_COMMENT: columns[C.DES_DIAGBASE],
        REQUESTER: 'Fernando',
        REQUESTER_ID: '12',
        ANESTHESIA: ANESTESIA[columns[C.CON_ANEST]],
        NUMBER_OF_TRANSPLANTS: transplants,
        LATERALITY_CODE: LATERALIDADE[columns[C.LOC_PROC]].code,
        LATERALITY_TEXT: LATERALIDADE[columns[C.LOC_PROC]].text,
        STATUS_CODE: STATUS[columns[C.MOT_SAIDA]].code,
        STATUS_TEXT: STATUS[columns[C.MOT_SAIDA]].text,
        DIFFICULTY_CODE: DIFFICULTY[columns[C.PRIORIDADE]].code,
        DIFFICULTY_TEXT: DIFFICULTY[columns[C.PRIORIDADE]].text,
        COMPLICATION_CODE: COMPLICATION[columns[C.PRIORIDADE]].code,
        COMPLICATION_TEXT: COMPLICATION[columns[C.PRIORIDADE]].text,
        PROPOSAL_DATE: columns[C.DATA_PROPOSTA],
        PROPOSAL_TIME: '00:00',
        COMPLETION_DATE: columns[C.DATA_FECHO],
        COMPLETION_TIME: '00:00',
        PROCEDURE_TYPE_CODE: PROCEDURE_TYPE[columns[C.DES_PROCIR]].code,
        PROCEDURE_TYPE_TEXT: PROCEDURE_TYPE[columns[C.DES_PROCIR]].text,
        PROCEDURE_REASON: columns[C.MOT_SAIDA],
        ADMISSION_DATE: anestesia ? columns[C.DATA_CONSULTA] : '',
        ADMISSION_TIME: anestesia ? '00:00' : '',
        DOCTER_NAME: anestesia ? 'Dr.Alberto' : '',
        DOCTER_ID: anestesia ? '1724' : '',
        OUTCOME: anestesia ? 'Outcome' : '',
        ANESTHESIA_OBS: anestesia ? 'Anesthesia observations' : ''
    };
}

readDiagnostico("../../dados/diagnostico_sem_acentos.csv").then(r => console.log("End!"));
readDoentes("../../dados/doentes_cornea_cod_postal_sem_acentos.csv").then(r => console.log("End!"));


