import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class DirectionsModal extends React.Component {
  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="modal-xl" id="dModal" onOpened={this.props.initMap}>
          <ModalHeader toggle={this.props.toggle}>Directions</ModalHeader>
          <ModalBody>
            <div>
              <div id="floating-panel">
                <form>
                  <strong>Start:</strong>
                  <input type="text" id="start" />
                  <button type="button" id="submit" className="btn btn-success">Go</button>
                </form>
              </div>
              <div id="right-panel"></div>
              <div id="directions-map" style={{ width: '100%', height: '20em' }}></div>
            </div>
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