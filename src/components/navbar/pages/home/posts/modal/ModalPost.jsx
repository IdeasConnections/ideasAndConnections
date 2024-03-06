import Modal from "react-bootstrap/Modal";
import "./Modal.css";
import Button from "react-bootstrap/Button";
import { FaTimes } from 'react-icons/fa';

export default function ModalPost({ modalOpen, setModalOpen }) {
  return (
    <Modal
      show={modalOpen}
      onHide={() => setModalOpen(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="custom-modal"
    >
      <Modal.Header className="custom-modal-header">
        <Modal.Title id="contained-modal-title-vcenter">
          Create a post
        </Modal.Title>
        <FaTimes onClick={() => setModalOpen(false)} className="custom-button" />
      </Modal.Header>
      <Modal.Body>
        <input 
         className="modal-input"
         placeholder="What do you want to talk about?" />
      </Modal.Body>
      <Modal.Footer className="custom-modal-footer">
        <Button className="post-btn" > Post </Button>
      </Modal.Footer>
    </Modal>
  );
}
