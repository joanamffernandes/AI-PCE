import {Form} from "protected-aidaforms";
import {replaceValuesJDT} from "./ReplaceValuesJDT";
import {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {P} from './CompositionItems';
import NotificationModal from '../notify/NotificationModal';


let json = require('./jdt_cornea_pt.json')
let style = require('./style_cornea_pt.json');

function Composition() {

    // default action is to create a composition
    const [action, setAction] = useState('create');
    const [newjdt, setNewjdt] = useState(null);
    const {proposal_id} = useParams();
    const location = useLocation();
    const isEditMode = location.state && location.state.isEditMode ? location.state.isEditMode : false;
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState("");

    const showSuccessMsg = (message) => {
        setShowSuccess(true);
        setMessage(message);
    };

    const showErrorMsg = (message) => {
        setShowError(true);
        setMessage(message);
    };


    useEffect(() => {
        async function fetchData() {
            if (proposal_id) {
                try {
                    const response = await fetch('http://localhost:8080/composition/' + proposal_id);
                    const data = await response.json();
                    if (data.success) {
                        setAction('update');
                        setNewjdt(replaceValuesJDT(JSON.parse(JSON.stringify(json)), data.response.composition))
                    } else {
                        console.log(data.response);
                        showErrorMsg(data.response);
                    }
                } catch (error) {
                    showErrorMsg(error.message);
                    console.log(error);
                }
            } else {
                setNewjdt(json);
            }
        }

        fetchData().then(() => console.log('Data fetched successfully!')).catch(error => console.log(error));
    }, [proposal_id]);


    function validaAnesthesiaData(composition, registration_date, proposal_date, completion_date) {

        let admission_date = composition[P.admission_date] ? new Date(composition[P.admission_date] + ' ' + composition[P.admission_time]) : null;

        if (composition[P.anesthesia] === 'Não' &&
            (!!composition[P.admission_date] ||
                !!composition[P.anesthesiology_consultation] ||
                !!composition[P.anesthesia_observations] ||
                !!composition[P.doctor_name] ||
                !!composition[P.doctor_id]
            )) {
            showErrorMsg("The 'Anesthesiology Consultation' section cannot be filled without activating the Anesthesia option in the 'Transplant Details' section.");
            return false;
        }


        if (composition[P.anesthesia]) {
            if (admission_date && !proposal_date) {
                showErrorMsg("It is mandatory to enter the proposal date in order to set the admission date.");
                return false;
            }

            if (registration_date && admission_date && admission_date < registration_date) {
                showErrorMsg("The admission date cannot be earlier than the registration date. " +
                    "<br/>Admission date: " + composition[P.admission_date] + ' ' + composition[P.admission_time] +
                    "<br/>Registration date: " + composition[P.registration_date] + ' ' + composition[P.registration_time]);
                return false;
            }

            if (proposal_date && admission_date && admission_date < proposal_date) {
                showErrorMsg("The admission date cannot be earlier than the date of the proposal. " +
                    "<br/>Admission date: " + composition[P.admission_date] + ' ' + composition[P.admission_time] +
                    "<br/>Proposal date: " + composition[P.proposal_date] + ' ' + composition[P.proposal_time]);
                return false;
            }

            if (completion_date && admission_date && completion_date < admission_date) {
                showErrorMsg("The completion date cannot be earlier than the admission date." +
                    "<br/>Completion date: " + composition[P.completion_date] + ' ' + composition[P.completion_time] +
                    "<br/>Admission date: " + composition[P.admission_date] + ' ' + composition[P.admission_time]);
                return false;
            }

            if (admission_date && (!composition[P.doctor_name] || !composition[P.doctor_id])) {
                showErrorMsg("The Doctor identification is mandatory when filling in the data for the anesthesia consultation.");
                return false;
            }
            if (!admission_date && (!!composition[P.doctor_name] || !!composition[P.doctor_id] ||
                !!composition[P.anesthesiology_consultation] || !!composition[P.anesthesia_observations])) {
                showErrorMsg("The admission date is mandatory when filling in the data for the anesthesia consultation.");
                return false;
            }
        }
        return true;
    }

    /**
     * Validação dos dados introduzidos no formulário
     */
    function validateData(composition) {

        // verificar se as datas estão correctas
        let registration_date = composition[P.registration_date] ? new Date(composition[P.registration_date] + ' ' + composition[P.registration_time]) : null;
        let proposal_date = composition[P.proposal_date] ? new Date(composition[P.proposal_date] + ' ' + composition[P.proposal_time]) : null;
        let completion_date = composition[P.completion_date] ? new Date(composition[P.completion_date] + ' ' + composition[P.completion_time]) : null;

        if (registration_date && proposal_date && proposal_date < registration_date) {
            showErrorMsg("The proposal date cannot be earlier than the registration date. " +
                "<br/>Proposal date: " + composition[P.proposal_date] + ' ' + composition[P.proposal_time] +
                "<br/>Registration date: " + composition[P.registration_date] + ' ' + composition[P.registration_time]);
            return false;
        }

        if (registration_date && completion_date && completion_date < registration_date) {
            showErrorMsg("The completion date cannot be earlier than the registration date. " +
                "<br/>Completion date: " + composition[P.completion_date] + ' ' + composition[P.completion_time] +
                "<br/>Registration date: " + composition[P.registration_date] + ' ' + composition[P.registration_time]);
            return false;
        }

        // verificar dados de anestesia
        if (!validaAnesthesiaData(composition, registration_date, proposal_date, completion_date)) {
            return false;
        }

        // verificar o número de transplantes é feito no servidor

        return true;
    }

    const handleSubmit = async (values) => {
        let composition_values = JSON.parse(values);

        if (!validateData(composition_values)) {
            return false;
        }

        fetch('http://localhost:8080/composition/' + action, {
            method: 'POST',
            body: JSON.stringify({
                proposal_id: proposal_id,
                patient_id: JSON.parse(composition_values[P.patient_id]).blocks[0].text,
                transplants: composition_values[P.number_of_transplants],
                composition: composition_values
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            response.json().then(data => {
                if (response.ok) {
                    if (data.success) {
                        showSuccessMsg(data.response);
                    } else {
                        showErrorMsg(data.response)
                    }
                }
            });
        }).catch(error => {
            showErrorMsg(error.message);
            console.log(error.message)
        });
    }

    if (!newjdt) {
        return (
            <div>
                <h3>Loading...</h3>
                {showError && (
                    <NotificationModal message={message} isSuccess={false} onClose={() => setShowError(false)}/>
                )}
            </div>);
    }

    return (
        <div className="App">

            <Form
                onSubmit={(values, changedFields) => handleSubmit(values)}
                onSave={(values, changedFields) => console.log("SAVED VALUES: ", values, "CHANGED FIELDS: ", changedFields)}
                onCancel={status => navigate('/')}
                template={newjdt}
                dlm={{}}
                showPrint={true}
                editMode={isEditMode}
                professionalTasks={["Registar Pedido", "Consultar Pedido", "Anular Pedido"]}
                canSubmit={isEditMode}
                canSave={isEditMode}
                canCancel={true}
                patientData={{}}
                reportData={{}}
                referenceModel={[]}
                submitButtonDisabled={false}
                saveButtonDisabled={false}
                formDesign={JSON.stringify(style)}
            />
            {showSuccess && (
                <NotificationModal message={message} isSuccess onClose={() => {
                    setShowSuccess(false);
                    navigate("/")
                }}/>
            )}
            {showError && (
                <NotificationModal message={message} isSuccess={false} onClose={() => setShowError(false)}/>
            )}
        </div>
    );
}

export default Composition;
