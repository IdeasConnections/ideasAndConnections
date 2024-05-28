import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProgressBar from "react-bootstrap/ProgressBar";
import { AiOutlinePicture } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import "./Modal.css";

export default function ModalPost({
  modalOpen,
  setModalOpen,
  setStatus,
  status,
  sendStatus,
  isEdit,
  updateStatus,
  uploadPostImage,
  setPostImage,
  postImage,
}) {
  const [progress, setProgress] = 0;
  return (
    <Modal
      show={modalOpen}
      onHide={() => {
        setModalOpen(false);
        setStatus("");
        setPostImage("");
        setProgress(0);
      }}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      className='custom-modal'
    >
      <Modal.Header className='custom-modal-header'>
        <Modal.Title id='contained-modal-title-vcenter'>
          {isEdit ? "Edit post" : "Create a post"}
        </Modal.Title>
        <FaTimes
          onClick={() => {
            setModalOpen(false);
            setStatus("");
            setPostImage("");
            setProgress(0);
          }}
          className='custom-button'
        />
      </Modal.Header>
      <Modal.Body>
        <div>
          <textarea
            className='modal-input'
            placeholder='What do you want to talk about?'
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            rows={3}
          />
          {progress === 0 ? (
            <></>
          ) : (
            <ProgressBar now={progress} label={`${progress}%`} visuallyHidden />
          )}

          {postImage.length > 0 ? (
            <img className='preview-img' src={postImage} alt='post-img' />
          ) : (
            <></>
          )}
        </div>

        <label for='pic-upload'>
          {" "}
          <AiOutlinePicture size={30} className='post-picture' />{" "}
        </label>
        <input
          id='pic-upload'
          type='file'
          hidden
          onChange={(e) =>
            uploadPostImage(e.target.files[0], setPostImage, setProgress)
          }
        />
      </Modal.Body>
      <Modal.Footer className='custom-modal-footer'>
        <Button
          className='post-btn'
          disabled={status.length > 0 ? false : true}
          onClick={isEdit ? updateStatus : sendStatus}
        >
          {isEdit ? "Update" : "Post"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
