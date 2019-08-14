import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class DirectionsModal extends React.Component {
  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="modal-xl">
          <ModalHeader toggle={this.props.toggle}>Directions</ModalHeader>
          <ModalBody>
            {this.props.body}  
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default DirectionsModal