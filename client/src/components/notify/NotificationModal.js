import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function NotificationModal({ message, isSuccess, onClose }) {
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        onClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                {isSuccess ? (
                    <Modal.Title className="d-flex align-items-center">
                        <span>
                            <FaCheckCircle className="text-success mr-2 ml-2" />
                        </span>
                        <span>Sucesso</span>
                    </Modal.Title>
                ) : (
                    <Modal.Title className="d-flex align-items-center">
                        <span>
                            <FaExclamationCircle className="text-danger mr-2 ml-2" />
                        </span>
                        <span>Erro</span>
                    </Modal.Title>
                )}
            </Modal.Header>
            <Modal.Body dangerouslySetInnerHTML={{__html: message}}></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
