import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

function ReviewsModal(props) {
  return (
    <div>
      <Modal isOpen={props.isOpen} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Reviews</ModalHeader>
        <ModalBody>
          {props.body}  
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default ReviewsModal