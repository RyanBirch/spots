import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class FavModal extends React.Component {
  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>Add to List</ModalHeader>
          <ModalBody>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
              <label className="form-check-label" htmlFor="defaultCheck1">
                Favorites
              </label>
            </div>
          </ModalBody>
          <ModalFooter>
          <Button color="primary" onClick={this.props.pushFav}>Confirm</Button>
            <Button color="secondary" onClick={this.props.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default FavModal