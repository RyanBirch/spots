import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

function CreateListModal(props) {
  return (
    <div>
      <Modal isOpen={props.isOpen} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Create New List</ModalHeader>
        <ModalBody>
        <form>
          <div className="form-group">
            <label>Name: </label>
            <input type="text" className="form-control" onChange={props.handleInputChange} name="newList" value={props.newList} />
          </div>
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