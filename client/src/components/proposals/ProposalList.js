import './ProposalList.css';
import $ from 'jquery'; // Importar o jQuery
import 'datatables.net'; // Importar os estilos e funcionalidades do DataTables
import 'datatables.net-dt/css/jquery.dataTables.css';
import {useNavigate} from "react-router-dom";
import {P} from './composition/CompositionItems';
import React, {useCallback, useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {BsEye} from "react-icons/bs";
import {BiPencil} from "react-icons/bi";
import {FaCheck, FaPlusCircle, FaTimes} from "react-icons/fa";
import NotificationModal from "../notify/NotificationModal";

function ProposalList() {

    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState("");
    const [proposals, setProposals] = useState([]);
    const [semDados, setSemDados] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isDataTableLoaded, setIsDataTableLoaded] = useState(false);

    const showErrorMsg = (message) => {
        setShowError(true);
        setMessage(message);
    };

    function handleComposition(proposal_id, isEditMode) {
        navigate(`/composition/${proposal_id}`, {state: {isEditMode: isEditMode}});
    }

    function parseJson(value) {
        try {
            return value instanceof Object ? value : JSON.parse(value);
        } catch (e) {
            return value;
        }
    }

    const getProposal = useCallback((p) => {
        let composition = parseJson(p.composition);

        function extractItem(item) {
            let value = parseJson(composition[item]);
            if (value) {
                return value.blocks[0].text;
            }
            return null;
        }

        let proposal = {};
        proposal['id'] = p._id;
        proposal['proposal_id'] = p.proposal_id;
        proposal['patient_id'] = extractItem(P.patient_id);
        proposal['name'] = extractItem(P.name);
        proposal['registration_date'] = composition[P.registration_date];
        proposal['proposal_date'] = composition[P.proposal_date];
        let priority = composition[P.priority];
        proposal['priority'] = priority ? priority.text : null;
        proposal['anesthesia'] = composition[P.anesthesia];
        let status = composition[P.status];
        proposal['status'] = status ? status[0].text : null;
        proposal['completion_date'] = composition[P.completion_date];
        proposal['procedure_type'] = composition[P.procedure_type].text;
        return proposal;
    }, []);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:8080/composition/list');
                const data = await response.json();
                if (data.success) {
                    let proposalList = [];
                    data.response.forEach((p) => {
                        let proposal = getProposal(p);
                        proposalList.push(proposal);
                    });
                    setProposals(proposalList);
                    if (proposalList.length === 0) {
                        setSemDados(true)
                    }
                } else {
                    console.log(data.response);
                    showErrorMsg(data.response);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
                showErrorMsg(error.message);
                setIsLoading(false);
            }
        }

        fetchData().then(
            () => console.log('Data fetched successfully!')
        ).catch(error => {
            console.log(error);
            showErrorMsg(error.message);
        });
    }, [getProposal]);

    useEffect(() => {
        if (semDados || (proposals.length > 0 && !isDataTableLoaded)) {
            const table = $('#proposals-table');
            const tableDiv = $('#table-container');
            table.DataTable().destroy();
            table.DataTable({
                initComplete: () => {
                    setIsLoading(false);
                    setIsDataTableLoaded(true);
                    tableDiv.removeClass("table-loading-mask");
                    tableDiv.removeClass("show-table");
                },
                order: [[1, 'asc']] // Ordenar pelo segundo campo (patient_id) por ordem ascendente
            });
        }
    }, [proposals, isDataTableLoaded, semDados]);


    function renderAnesthesiaIcon(value) {
        if (value === 'Sim') {
            return <FaCheck/>;
        } else if (value === 'Não') {
            return <FaTimes/>;
        } else {
            return null;
        }
    }

    return (
        <div className="root">
            <h1 className="h1">Propostas de Transplante de Córnea</h1>
            <div className="d-flex justify-content-end mb-3">
                <button
                    className="btn btn-sm new-proposal-btn text-white"
                    onClick={() => handleComposition("", true)}>
                    <FaPlusCircle/>&nbsp;&nbsp;Create
                </button>
            </div>
            <div id="table-container" className="show-table table-loading-mask">
                <TableContainer component={Paper}>
                    <Table id="proposals-table" className="">
                        <TableHead className="table-header">
                            <TableRow>
                                <TableCell style={{display: 'none'}}>Proposal</TableCell>
                                <TableCell>Paciente</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Data de Registo</TableCell>
                                <TableCell>Data da Proposta</TableCell>
                                <TableCell>Tipo de Procedimento</TableCell>
                                <TableCell>Prioridade</TableCell>
                                <TableCell>Anestesia</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Data de Conclusão</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        {proposals.length > 0 ? (
                            <TableBody className="table-body">
                                {proposals.map((proposal) => (
                                    <TableRow key={proposal.id}>
                                        <TableCell style={{display: 'none'}}>{proposal.proposal_id}</TableCell>
                                        <TableCell>{proposal.patient_id}</TableCell>
                                        <TableCell>{proposal.name}</TableCell>
                                        <TableCell>{proposal.registration_date}</TableCell>
                                        <TableCell>{proposal.proposal_date}</TableCell>
                                        <TableCell>{proposal.procedure_type}</TableCell>
                                        <TableCell>{proposal.priority}</TableCell>
                                        <TableCell
                                            className="btn-icon">{renderAnesthesiaIcon(proposal.anesthesia)}</TableCell>
                                        <TableCell>{proposal.status}</TableCell>
                                        <TableCell>{proposal.completion_date}</TableCell>
                                        <TableCell>
                                            <button className="btn btn-sm"
                                                    onClick={() => handleComposition(proposal.proposal_id, false)}>
                                                <BsEye/>
                                            </button>
                                            <button className="btn btn-sm"
                                                    onClick={() => handleComposition(proposal.proposal_id, true)}>
                                                <BiPencil/>
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        ) : (
                            <TableBody className="table-body"></TableBody>
                        )}
                    </Table>
                </TableContainer>
            </div>
            {isLoading && (
                <div className="loading-mask">
                    <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            {showError && (
                <NotificationModal message={message} isSuccess={false} onClose={() => setShowError(false)}/>
            )}
        </div>
    );
}

export default ProposalList;
