import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

function DeleteListModal(props) {
  return (
    <div>
      <Modal isOpen={props.isOpen} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}></ModalHeader>
        <ModalBody>
          <h4>Are you sure you want to delete this?</h4>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={props.handleDelete}>Yes, get rid of it</Button>
          <Button color="secondary" onClick={props.toggle}>No, just kidding</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default DeleteListModal