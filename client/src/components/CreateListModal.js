import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

function CreateListModal(props) {
  return (
    <div>
      <Modal isOpen={props.isOpen} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Create New List</ModalHeader>
        <ModalBody>
          <form>

            {/* list name */}
            <div className="form-group">
              <label>List Name: </label>
              <input type="text" className="form-control" onChange={props.handleInputChange} name="newList" value={props.newList} />
            </div>

            {/* city
            <div className="form-group">
              <label>City (optional): </label>
              <input type="text" className="form-control" onChange={props.handleInputChange} name="city" value={props.city} />
            </div> */}

            {/* public/private
            <div className="form-group">
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                <label className="form-check-label" for="inlineRadio1"> Public</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                <label className="form-check-label" for="inlineRadio2"> Private</label>
              </div>
              <br /><small>Public lists will be discoverable in the discover section</small>
            </div> */}

            <button type="submit" className="btn btn-primary w-100" onClick={props.createList}>Submit</button>

          </form>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default CreateListModal