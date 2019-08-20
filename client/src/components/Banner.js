import React from 'react'
import { Redirect } from 'react-router-dom'

class Banner extends React.Component {

  state = {
    redirectToSearch: false,
    what: '',
    where: ''
  }

  handleChange = event => {
    let { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    let what = document.getElementById('what')
    let where = document.getElementById('where')
    sessionStorage['what'] = what.value
    sessionStorage['where'] = where.value
    this.setState({ redirectToSearch: true })
  }

  render() {

    if (this.state.redirectToSearch) return <Redirect to="/search" />

    return (
      <div>

        <h2 className="text-center text-light" style={{ marginTop: '0.5em', marginBottom: '0.5em', fontFamily: 'Great vibes, cursive', fontSize: '3em' }}>Your favorite spots, all in one place</h2>
  
        <form onSubmit={this.handleSubmit} style={{ marginTop: '6em' }}>
          <div className="row">
            <div className="col-lg-6 mt-1 mb-3 text-light text-center">
              Search for
              <input id="what" type="text" className="form-control ml-2" placeholder="Restaurants, bars, events, etc." style={{ width: '60%', display: 'inline-block' }} onChange={this.handleChange} name="what" value={this.state.what} />
            </div>
            <div className="col-lg-6 mt-1 mb-3 text-light text-center">
              Near
              <input id="where" type="text" className="form-control ml-2 mr-2" placeholder="" style={{ width: '60%', display: 'inline-block' }} onChange={this.handleChange} name="where" value={this.state.where} />
              <button type="submit" className="btn btn-primary">Go!</button>
            </div>
          </div>
        </form>

      </div>
    )
  }
}

export default Banner