const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');
const express = require("express");
const uri = "mongodb://localhost:9000/database";
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

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
        "text": "Feminino"
    },
    'Masculino': {
        "code": "at0019",
        "text": "Masculino"
    }
};
DIFFICULTY = {
    2: {"code": "3", "text": "Elevado"},
    1: {"code": "2", "text": "Médio"},
    0: {"code": "1", "text": "Baixo"}
};
COMPLICATION = {
    2: {"code": "3", "text": "Elevado"},
    1: {"code": "2", "text": "Médio"},
    0: {"code": "1", "text": "Baixo"}
};

LATERALIDADE = {'Esquerdo': {"code": "at0003", "text": "Esquerdo"}, 'Direito': {"code": "at0004", "text": "Direito"}}
PRIORITY = {
    2: {"code": "at0136", "text": "Emergente"},
    1: {"code": "at0137", "text": "Urgente"},
    0: {"code": "at0138", "text": "Normal"}
};

PROCEDURE_TYPE = {
    'Transplante de Córnea Lamelar Posterior (Endotelial)': {
        "code": "DMEK",
        "text": "Ceratoplastia endotelial com descamação de Descemet (DMEK)"
    },
    'Transplante de Córnea Total (Queratoplastia)': {
        "code": "DALK",
        "text": "Queratoplastia Lamelar Anterior Profunda (DALK)"
    },
    'Transplante de Córnea Lamelar Anterior': {
        "code": "BOWMAN",
        "text": "Transplante da camada anterior profunda de Bowman (BL)(BOWMAN)"
    },
    'Transplante de Córnea Límbico': {
        "code": "DSAEK",
        "text": "Transplante de Córnea Lamelar Posterior (Endotelial) (DSAEK)"
    }
};

STATUS = {
    'Transplantado': {
        "code": "completed",
        "text": "Concluído"
    },
    'Desistência': {
        "code": "cancelled",
        "text": "Cancelado"
    },
    'Contra indicação definitiva': {
        "code": "aborted",
        "text": "Interrumpido"
    },
    'Contra indicação temporária': {
        "code": "postponed",
        "text": "Adiado"
    },
    'Morte': {
        "code": "aborted",
        "text": "Interrumpido"
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

const csvWriter = createCsvWriter({
    path: 'dataset.csv',
    header: [
        {id: 'PATIENT_NAME', title: 'PATIENT_NAME'},
        {id: 'PATIENT_ID', title: 'PATIENT_ID'},
        {id: 'BIRTH_DATE', title: 'BIRTH_DATE'},
        {id: 'BIRTH_TIME', title: 'BIRTH_TIME'},
        {id: 'ADDRESS_LINE', title: 'ADDRESS_LINE'},
        {id: 'TOWN', title: 'TOWN'},
        {id: 'DISTRICT', title: 'DISTRICT'},
        {id: 'POSTAL_CODE', title: 'POSTAL_CODE'},
        {id: 'COUNTRY', title: 'COUNTRY'},
        {id: 'GENDER_CODE', title: 'GENDER_CODE'},
        {id: 'GENDER_TEXT', title: 'GENDER_TEXT'},
        {id: 'DIAGNOSIS_CODE', title: 'DIAGNOSIS_CODE'},
        {id: 'DIAGNOSIS_TEXT', title: 'DIAGNOSIS_TEXT'},
        {id: 'PRIORITY_CODE', title: 'PRIORITY_CODE'},
        {id: 'PRIORITY_TEXT', title: 'PRIORITY_TEXT'},
        {id: 'REGISTRATION_DATE', title: 'REGISTRATION_DATE'},
        {id: 'REGISTRATION_TIME', title: 'REGISTRATION_TIME'},
        {id: 'SERVICE_DUE_DATE', title: 'SERVICE_DUE_DATE'},
        {id: 'SERVICE_DUE_TIME', title: 'SERVICE_DUE_TIME'},
        {id: 'SERVICE_REQUEST_COMMENT', title: 'SERVICE_REQUEST_COMMENT'},
        {id: 'REQUESTER', title: 'REQUESTER'},
        {id: 'REQUESTER_ID', title: 'REQUESTER_ID'},
        {id: 'ANESTHESIA', title: 'ANESTHESIA'},
        {id: 'NUMBER_OF_TRANSPLANTS', title: 'NUMBER_OF_TRANSPLANTS'},
        {id: 'LATERALITY_CODE', title: 'LATERALITY_CODE'},
        {id: 'LATERALITY_TEXT', title: 'LATERALITY_TEXT'},
        {id: 'STATUS_CODE', title: 'STATUS_CODE'},
        {id: 'STATUS_TEXT', title: 'STATUS_TEXT'},
        {id: 'DIFFICULTY_CODE', title: 'DIFFICULTY_CODE'},
        {id: 'DIFFICULTY_TEXT', title: 'DIFFICULTY_TEXT'},
        {id: 'COMPLICATION_CODE', title: 'COMPLICATION_CODE'},
        {id: 'COMPLICATION_TEXT', title: 'COMPLICATION_TEXT'},
        {id: 'PROPOSAL_DATE', title: 'PROPOSAL_DATE'},
        {id: 'PROPOSAL_TIME', title: 'PROPOSAL_TIME'},
        {id: 'COMPLETION_DATE', title: 'COMPLETION_DATE'},
        {id: 'COMPLETION_TIME', title: 'COMPLETION_TIME'},
        {id: 'PROCEDURE_TYPE_CODE', title: 'PROCEDURE_TYPE_CODE'},
        {id: 'PROCEDURE_TYPE_TEXT', title: 'PROCEDURE_TYPE_TEXT'},
        {id: 'PROCEDURE_REASON', title: 'PROCEDURE_REASON'},
        {id: 'ADMISSION_DATE', title: 'ADMISSION_DATE'},
        {id: 'ADMISSION_TIME', title: 'ADMISSION_TIME'},
        {id: 'DOCTER_NAME', title: 'DOCTER_NAME'},
        {id: 'DOCTER_ID', title: 'DOCTER_ID'},
    ]
});

function readfile(filename) {
    const fileRead = fs.readFileSync(path.resolve(__dirname, filename));
    lines = fileRead.toString().split('\n');
    lines.splice(0, 1);
    return lines;
}

DIAGNOSTICO_VALUES = {
    "H16.319": "Abcesso da córnea",
    "H18.30": "Alterações de membrana da córnea",
    "H52.219": "Astigmatismo irregular",
    "H18.739": "Descemetocelo",
    "H18.51": "Distrofia endotelial da córnea",
    "H18.719": "Ectasia da córnea",
    "H18.20": "Edema da córnea",
    "T86.849": "Enxerto da córnea (complicação)",
    "T86.841": "Enxerto da córnea (falência)",
    "T86.840": "Enxerto da córnea (rejeição)",
    "H17.9": "Opacidade de córnea",
    "H18.609": "Queratocone",
    "H18.10": "Queratopatia bolhosa",
    "H18.429": "Queratopatia em banda",
    "H16.009": "Úlcera da córnea",
    "H16.079": "Úlcera da córnea perfurada"
}

DIAGNOSTICO = {}

async function readDiagnostico(filename) {
    let lines = readfile(filename);
    for (let line of lines) {
        let columns = line.replace("\r", "").split(";");
        DIAGNOSTICO[columns[3]] = {"code": columns[1], "text": DIAGNOSTICO_VALUES[columns[1]]}
    }
}

async function readDoentes(filename) {

    const lines = readfile(filename);
    const records = [];
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
        records.push(record);

        for (const [key, value] of Object.entries(record)) {
            composition = composition.replace('${' + key + '}', value);
        }
        const proposal = await CompositionController.newComposition(patient_id, transplants, JSON.parse(composition))
        if (!proposal.success) {
            console.log(proposal.response);
        }
    }
    // Escrever os registros no arquivo CSV
    csvWriter
        .writeRecords(records)
        .then(() => console.log('Ficheiro CSV gerado com sucesso!'))
        .catch((error) => console.error('Erro ao gerar o arquivo CSV:', error));

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
        OUTCOME: anestesia ? 'Resultado' : '',
        ANESTHESIA_OBS: anestesia ? 'Observações de anestesia' : ''
    };
}

readDiagnostico("../../dados/diagnostico_sem_acentos.csv").then(r => console.log("Ficheiro diagnostico_sem_acentos carregado!"));
readDoentes("../../dados/doentes_cornea_cod_postal_sem_acentos.csv").then(r => console.log("End!"));


