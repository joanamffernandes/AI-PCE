const fs = require('fs');
const mongoose = require('mongoose');
const express = require("express");
const uri = "mongodb://localhost:9000/database";

mongoose.set('strictQuery', true);
mongoose.connect(uri)
    .then(() => console.log('Connected.'))
    .catch(() => console.log('Error connecting to MongoDB.'))

const CompositionController = require('../controller/composition');
const template = JSON.parse(fs.readFileSync('template_composition.json'));


patient = [];
docter = [];
requester = [];

priority = [{"code": "at0136", "text": "Emergency"}, {"code": "at0137", "text": "Urgent"}, {
    "code": "at0138",
    "text": "Routine"
}];
difficulty = [{"code": '1', "text": 'Low'}, {"code": '2', "text": 'Medium'}, {"code": '3', "text": 'High'}]
complication = [{"code": '1', "text": 'Low'}, {"code": '2', "text": 'Medium'}, {"code": '3', "text": 'High'}]
laterality = [{"code": "at0003", "text": "Left"}, {"code": "at0004", "text": "Right"}]
diagnosis = [
    {"code": 'H16.319', "text": 'Corneal abscess'},
    {"code": 'H18.30', "text": 'Corneal membrane change'},
    {"code": 'H52.219', "text": 'Irregular astigmatism'},
    {"code": 'H18.739', "text": 'Descemetocele'},
    {"code": 'H18.51', "text": 'Corneal endothelial dystrophy'},
    {"code": 'H18.719', "text": 'Corneal ectasia'},
    {"code": 'H18.20', "text": 'Corneal edema'},
    {"code": 'T86.849', "text": 'Complication of corneal transplant'},
    {"code": 'T86.841', "text": 'Corneal transplant failure'},
    {"code": 'T86.840', "text": 'Corneal transplant rejection'},
    {"code": 'H17.9', "text": 'Corneal scar and opacity'},
    {"code": 'H18.609', "text": 'Keratoconus'},
    {"code": 'H18.10', "text": 'Bullous keratopathy'},
    {"code": 'H18.429', "text": 'Band keratopathy'},
    {"code": 'H16.009', "text": 'Corneal ulcer'},
    {"code": 'H16.079', "text": 'Perforated corneal ulcer'}
];
procedure_status = [
    {"code": "planned", "text": "Procedure planned"},
    {"code": "postponed", "text": "Procedure postponed"},
    {"code": "cancelled", "text": "Procedure cancelled"},
    {"code": "scheduled", "text": "Procedure scheduled"},
    {"code": "suspended", "text": "Procedure supended"},
    {"code": "aborted", "text": "Procedure aborted"},
    {"code": "completed", "text": "Procedure completed"}
]

const record = {
    PATIENT_NAME: "Maria",
    PATIENT_ID: 1,
    ADDRESS_LINE: 'Rua',
    TOWN: "Braga",
    DISTRICT: "Braga",
    POSTAL_CODE: "4715",
    COUNTRY: "Portugal",
    GENDER_CODE: "at0018",
    GENDER_TEXT: "Female",
    DIAGNOSIS_CODE: 'H16.319',
    DIAGNOSIS_TEXT: 'Corneal abscess',
    PRIORITY_CODE: 'at0136',
    PRIORITY_TEXT: 'Emergency',
    REGISTRATION_DATE: '2023-05-10',
    REGISTRATION_TIME: '22:35',
    SERVICE_DUE_DATE: '2023-05-10',
    SERVICE_DUE_TIME: '22:45',
    SERVICE_REQUEST_COMMENT: 'This is the service request comment',
    REQUESTER: 'Fernando',
    REQUESTER_ID: '123',
    ANESTHESIA: 'Sim',
    LATERALITY_CODE: 'at0003',
    LATERALITY_TEXT: 'Left',
    STATUS_CODE: 'planned',
    STATUS_TEXT: 'Procedure planned',
    DIFFICULTY_CODE: '1',
    DIFFICULTY_TEXT: 'Low',
    COMPLICATION_CODE: '1',
    COMPLICATION_TEXT: 'Low',
    PROPOSAL_DATE: '2023-05-12',
    PROPOSAL_TIME: '09:00',
    COMPLETION_DATE: '2023-05-12',
    COMPLETION_TIME: '10:00',
    PROCEDURE_TYPE_CODE: 'DALK',
    PROCEDURE_TYPE_TEXT: 'Deep Anterior Lamellar Keratoplasty (DALK)',
    PROCEDURE_REASON: 'Procedure reason',
    ADMISSION_DATE: '2023-05-12',
    ADMISSION_TIME: '09:00',
    DOCTER_NAME: 'Dr.Alberto',
    DOCTER_ID: '123',
    OUTCOME: 'Outcome',
    ANESTHESIA_OBS: 'Anesthesia observations'
};

function generate_composition_record(patient_id) {
    record.PATIENT_ID = patient_id;
}

async function generateProposals() {

    for (let i = 0; i < 2; i++) {

        let patient_id = i + 1;
        generate_composition_record(patient_id);

        let composition = JSON.stringify(template);
        for (const [key, value] of Object.entries(record)) {
            composition = composition.replace('${' + key + '}', value);
        }
        const proposal = await CompositionController.newComposition(patient_id, JSON.parse(composition))
        console.log(proposal.response);
    }
}

generateProposals().then(r => console.log("End!"));

