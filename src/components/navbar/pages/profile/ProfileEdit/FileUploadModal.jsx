import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './FileUploadModal.css'


export default function FileUploadModal({modalOpen, setModalOpen, getImage, uploadImageTostorage, currentImage, progress}){
    return (
      <Modal
      show={modalOpen}
      onHide={()=> setModalOpen(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="custom-modal"
  
    >
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title id="contained-modal-title-vcenter">
          Add a profile photo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
         <div className='image-upload-main'>
          <p>{currentImage.name}</p>
          <label for='image-upload' className='upload-btn'>Add an image</label>
          <input hidden id= 'image-upload' type="file" onChange={getImage} /> 
         </div>
         <ProgressBar now={progress} label={`${progress}%`} visuallyHidden  />
      </Modal.Body>
      <Modal.Footer className="custom-modal-footer">
        <Button onClick={()=> setModalOpen(false)}  className="custom-button"> Close</Button>
        <Button onClick={uploadImageTostorage}  className="custom-button" disabled= {currentImage.name? false: true}>
           Upload Image
          </Button>
      </Modal.Footer>
      
    </Modal>
      );
}