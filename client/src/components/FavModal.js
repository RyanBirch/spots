import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import API from '../utils/API'

class FavModal extends React.Component {

  state = {
    lists: [],
    selected: ''
  }

  componentDidMount() {
    this.getLists()
  }

  getLists = () => {
    API.getCustomLists().then(res => {
      console.log(res.data)
      this.setState({ lists: res.data })
    })
  }

  handleOptionChange = event => {
    this.setState({ selected: event.target.value })
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>Add to List</ModalHeader>
          <ModalBody>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="radios" value="favorites" id="defaultCheck1" onChange={this.handleOptionChange} />
              <label className="form-check-label" htmlFor="defaultCheck1" style={{ cursor: 'pointer' }}>Favorites</label>
              {
                this.state.lists.length ? (
                  this.state.lists.map(item => {
                    return (
                      <div key={item._id}>
                        <input className="form-check-input" type="radio" name="radios" value={item.name} id={item._id} onChange={this.handleOptionChange} />
                        <label className="form-check-label" htmlFor={item._id} style={{ cursor: 'pointer' }}>{item.name}</label>
                      </div>
                    )
                  })
                ) : ''
              }
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.props.pushFav(this.state.selected)}>Confirm</Button>
            <Button color="secondary" onClick={this.props.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default FavModal