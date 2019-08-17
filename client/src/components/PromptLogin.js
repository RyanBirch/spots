import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Link } from 'react-router-dom'

function PromptLogin(props) {
  return (
    <div>
      <div>
        <Modal isOpen={props.isOpen} toggle={props.toggle}>
          <ModalHeader toggle={props.toggle}>Add to List</ModalHeader>
          <ModalBody>
            <h4 className="text-center">Log in to add Favorites!</h4>
          </ModalBody>
          <ModalFooter>
            <Link to="/login"><Button color="warning" style={{ display: 'block' }}>Login</Button></Link>
            <Button color="secondary" onClick={props.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  )
}

export default PromptLogin